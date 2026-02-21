from flask_cors import CORS
from flask import Flask, request
import mysql.connector
import os
import json
import signal
import datetime
import sys

app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

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


@app.route('/api/<location>/<offset>', methods=["POST"])
def library_enter(location, offset):
    cursor = connection.cursor()
    id = get_location_id(location, cursor)
    if not id:
        return "Library does not exist", 404

    new_datapoint(id, offset, cursor)
    connection.commit()
    cursor.close()
    return '', 204


@app.route('/api/locations', methods=["GET"])
def get_fullness():
    cursor = connection.cursor()
    statement = (
        "SELECT * FROM library"
    )
    cursor.execute(statement)
    return json.dumps(cursor.fetchall())


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


@app.route('/api/libraries/<library_name>/count', methods=["GET"])
def get_library(library_name: str):
    print(request.args, file=sys.stderr)
    time = datetime.datetime.now().strftime("%Y%m%d %X")
    if 'at' in request.args:
        time = request.args['at']

    cursor = connection.cursor()
    count = get_current_library_count(library_name, time, cursor)
    cursor.close()
    if count is None:
        return 'no data', 204
    return int(count)


def get_current_library_count(library_id, time, cursor) -> int | None:
    statement = (
        '''
        SELECT sum(dp.offset) FROM capacity_datapoint as dp
        WHERE dp.library_id = %s AND DATE(dp.time) = CURRENT_DATE();
        '''
    )

    cursor.execute(statement, (library_id, ))
    result = cursor.fetchone()
    return result[0] if result else None