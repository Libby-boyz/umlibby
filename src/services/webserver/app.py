from flask_cors import CORS
from flask import Flask, request, jsonify
import mysql.connector
import os
import signal
import datetime
import sys

app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
signal.signal(signal.SIGTERM, lambda: sys.exit(5))

connection = mysql.connector.connect(
    host="db",
    port=3306,
    user='root',
    password=os.environ['MYSQL_ROOT_PASSWORD'],
    database='libby'
)

cursor = connection.cursor()
cursor.execute('SET @@session.time_zone = "-6:00";')
cursor.close()
connection.commit()


@app.route('/api/libraries/<library_id>/<offset>', methods=["POST"])
def library_enter(library_id, offset):
    cursor = connection.cursor()
    new_datapoint(library_id, offset, cursor)
    connection.commit()
    cursor.close()
    return '', 204


@app.route('/api/locations', methods=["GET"])
def get_fullness():
    cursor = connection.cursor(dictionary=True)
    statement = (
        "SELECT * FROM library"
    )
    cursor.execute(statement)
    return jsonify(cursor.fetchall())


def get_location_id(name, cursor) -> int | None:
    statement = (
        'SELECT id FROM libby.library WHERE name = %s'
    )
    cursor.execute(statement, (name,))
    result = cursor.fetchone()
    return result[0] if result else None


def new_datapoint(id, enter: bool, cursor):
    statement = (
        'INSERT INTO libby.capacity_datapoint (library_id, offset) VALUES (%s, %s)'
    )
    cursor.execute(statement, (id, 1 if enter else -1))


@app.route('/api/libraries/<library_id>/<date>/count', methods=["GET"])
def get_library(library_id: str, date: str):
    if date == 'today':
        date = datetime.datetime.now().strftime("%Y-%m-%d")

    cursor = connection.cursor()
    if 'time' in request.args:
        count = get_current_library_count_at(library_id, date, request.args['time'], cursor)
    else:
        count = get_current_library_count(library_id, date, cursor)

    cursor.close()
    if count is None:
        return 'no data', 204
    return {'count': str(count)}, 200


# probably doesn't work
def get_current_library_count_at(library_id, date, time, cursor) -> int | None:
    statement = (
        '''
        SELECT sum(dp.offset) FROM capacity_datapoint as dp WHERE dp.library_id = %s
        AND DATE(dp.time) = %s
        AND TIME_TO_SEC(TIME(dp.time)) <= %s;
        '''
    )

    cursor.execute(statement, (library_id, date, time))
    result = cursor.fetchone()
    return result[0] if result else None


def get_current_library_count(library_id, date, cursor) -> int | None:
    statement = (
        '''
        SELECT sum(dp.offset) FROM capacity_datapoint as dp
        WHERE dp.library_id = %s AND DATE(dp.time) = %s;
        '''
    )

    cursor.execute(statement, (library_id, date))
    result = cursor.fetchone()
    return result[0] if result else None
