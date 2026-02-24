from flask_cors import CORS
from flask import Flask, request, jsonify
from time import sleep
import mysql.connector
import os
import signal
import datetime
import sys


MAX_RETRIES = 10

def setTimezone():
    cursor = connection.cursor()
    cursor.execute('SET @@session.time_zone = "-6:00";')
    connection.commit()
    cursor.close()


connection = mysql.connector.connect(
    pool_size=15,
    host="db",
    port=3306,
    user='root',
    password=os.environ['MYSQL_ROOT_PASSWORD'],
    database='libby'
)


app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
signal.signal(signal.SIGTERM, lambda: sys.exit(5))
setTimezone()



#---------------------------------------#
# General Query Methods
#---------------------------------------#
def execute_query_read_only(query:str, params:tuple, output_func=None, use_dict=False):
    tries = 0
    cursor = None
    while tries < MAX_RETRIES:
        try:

            cursor = connection.cursor(dictionary=use_dict)
            cursor.execute(query, params)
            output = None
            if output_func:
                output = output_func(cursor)
            cursor.close()
            return output
        
        except mysql.connector.Error:

            # Make sure we actually got a cursor before closing
            if cursor:
                cursor.close()
            sleep(0.001)
            tries+=1
    
    return None

def execute_query(query:str, params:tuple, output_func=None, use_dict=False):
    tries = 0
    cursor = None
    while tries < MAX_RETRIES:
        try:

            cursor = connection.cursor(dictionary=use_dict)
            cursor.execute(query, params)
            connection.commit()
            output = None
            if output_func:
                output = output_func(cursor)
            cursor.close()
            return output
        
        except mysql.connector.Error:

            # Make sure we actually got a cursor before closing
            if cursor:
                cursor.close()
            sleep(0.001)
            tries+=1
    
    return None

def get_first(cursor):
    result = cursor.fetchone()
    return result[0] if result else None

def get_all(cursor):
    result = cursor.fetchall()
    return result if result else None



#---------------------------------------#
# API Routes
#---------------------------------------#
@app.route('/api/libraries/<library_id>/<offset>', methods=["POST"])
def library_enter(library_id, offset):
    new_datapoint(library_id, offset)
    return '', 204


def new_datapoint(id, offset):
    #cursor = connection.cursor()
    statement = (
        '''
        INSERT INTO libby.capacity_datapoint(library_id, offset)
        SELECT %s, %s FROM dual
        WHERE NOT EXISTS (
            SELECT fullness FROM current_capacity AS cc
            WHERE cc.library_id = %s
            AND (cc.fullness + %s) < 0
        );
        '''
    )
    execute_query(statement, (id, offset, id, int(offset)))
    #cursor.execute(statement, (id, offset, id, int(offset)))
    #connection.commit()
    #cursor.close()




@app.route('/api/locations', methods=["GET"])
def get_libraries():
    return get_locations(), 200

def get_locations():
    #cursor = connection.cursor(dictionary=True)
    statement = (
        '''
        SELECT lib.*, cc.fullness AS fullness
        FROM library lib
        LEFT JOIN current_capacity cc
            ON cc.library_id = lib.id
        '''
    )
    #cursor.execute(statement)
    #result = jsonify(cursor.fetchall())
    #cursor.close()
    result = jsonify(execute_query_read_only(statement, (), get_all, use_dict=True))
    return result







@app.route('/api/libraries/<library_id>/<date>/count', methods=["GET"])
def get_library(library_id: str, date: str):
    if date == 'today':
        date = datetime.datetime.now().strftime("%Y-%m-%d")

    if 'time' not in request.args:
        return 'must provide ?time=seconds_since_midnight', 400

    count = get_current_library_count_at(library_id, date, request.args['time'])

    if count is None:
        return 'no data', 204
    else:
        return {'count': str(count)}, 200


# probably doesn't work
def get_current_library_count_at(library_id, date, time) -> int | None:
    statement = (
        '''
        SELECT sum(dp.offset) FROM capacity_datapoint as dp WHERE dp.library_id = %s
        AND DATE(dp.time) = %s
        AND TIME_TO_SEC(TIME(dp.time)) <= %s;
        '''
    )

    #cursor = connection.cursor()
    #cursor.execute(statement, (library_id, date, time))
    #res = getFirst(cursor)
    #cursor.close()
    return execute_query_read_only(statement, (library_id, date, time), get_first)



#def get_current_library_count(library_id, date, cursor) -> int | None:
#    statement = (
#        '''
#        SELECT sum(dp.offset) FROM capacity_datapoint as dp
#        WHERE dp.library_id = %s AND DATE(dp.time) = %s;
#        '''
#    )
#
#    cursor.execute(statement, (library_id, date))
#    getFirst(cursor)
#
#
#def getFirst(cursor):
#    result = cursor.fetchone()
#    return result[0] if result else None


@app.route('/api/libraries/<library_id>/hourly-trends', methods=["GET"])
def hourly_trends(library_id):
    result = get_avg_count_per_hour(library_id)
    if not result:
        return 'no data', 204
    else:
        return jsonify(result), 200


def get_avg_count_per_hour(library_id):
    statment = '''
        -- Get number of people entering library for each of each day
        WITH daily_counts as (
        SELECT SUM(dp.offset) as count, 
        DATE(dp.time) as date_logged,
        HOUR(dp.time) as hour_logged
        FROM capacity_datapoint as dp
        WHERE library_id = %s AND dp.offset > 0
        GROUP BY date_logged, hour_logged
        )

        -- Calculate average people per day and group by hour
        SELECT CAST(avg(daily_counts.count) as DOUBLE) as average, hour_logged as hour
        FROM daily_counts
        GROUP BY hour_logged
        '''
    
    result = execute_query_read_only(statment, (library_id,), get_all, use_dict=True)
    if not result:
        return None

    # Swap hour num (0-23) to display names (12am-11pm)
    data = {}
    for i in range(len(result)):

        hour = int(result[i]['hour'])
        if hour == 0:
            display_name = "12am"
        elif hour < 12:
            display_name = f"{hour}am"
        elif hour == 12:
            display_name = "12pm"
        else:
            display_name = f"{int(hour)%12}pm"

        data[display_name] = result[i]["average"]

    print(data)
    return data

get_avg_count_per_hour(1)