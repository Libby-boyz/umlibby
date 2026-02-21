from flask_cors import CORS
from flask import Flask, request, jsonify
import mysql.connector
import os
import signal
import datetime
import sys


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


@app.route('/api/libraries/<library_id>/<offset>', methods=["POST"])
def library_enter(library_id, offset):
    new_datapoint(library_id, offset)
    return '', 204


def new_datapoint(id, offset):
    cursor = connection.cursor()
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
    cursor.execute(statement, (id, offset, id, int(offset)))
    connection.commit()
    cursor.close()


@app.route('/api/locations', methods=["GET"])
def get_libraries():
    return get_locations(), 200


def get_locations():
    cursor = connection.cursor(dictionary=True)
    statement = (
        '''
        SELECT lib.*, cc.fullness AS fullness
        FROM library lib
        LEFT JOIN current_capacity cc
            ON cc.library_id = lib.id
        '''
    )
    cursor.execute(statement)
    result = jsonify(cursor.fetchall())
    cursor.close()
    return result


'''
'''
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

    cursor = connection.cursor()
    cursor.execute(statement, (library_id, date, time))
    res = getFirst(cursor)
    cursor.close()
    return res


def get_current_library_count(library_id, date, cursor) -> int | None:
    statement = (
        '''
        SELECT sum(dp.offset) FROM capacity_datapoint as dp
        WHERE dp.library_id = %s AND DATE(dp.time) = %s;
        '''
    )

    cursor.execute(statement, (library_id, date))
    getFirst(cursor)


def getFirst(cursor):
    result = cursor.fetchone()
    return result[0] if result else None