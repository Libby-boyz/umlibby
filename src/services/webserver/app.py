from flask import Flask
import mysql.connector
import signal
import sys
import os
import datetime

app = Flask(__name__)
signal.signal(signal.SIGTERM, lambda: sys.exit(5))

connection = mysql.connector.connect(
    host="db",
    port=3306,
    user='root',
    password=os.environ['MYSQL_ROOT_PASSWORD'],
    database='libby'
)


@app.route('/api/locations', methods=["GET"])
def get_fullness():
    cursor = connection.cursor()
    statement = (
        "SELECT name FROM library"
    )
    cursor.execute(statement)
    return [item for sublist in cursor.fetchall() for item in sublist]


@app.route('/api/<location>/<direction>', methods=["POST"])
def library_enter(location, direction):
    cursor = connection.cursor()
    id = getLocationId(location, cursor)
    newDatapoint(id, (direction == 'enter'), cursor)
    cursor.close()
    connection.commit()
    return 'ok'


def getLocationId(name, cursor):
    statement = (
        'SELECT id FROM libby.library WHERE name = %s'
    )
    cursor.execute(statement, (name,))
    return cursor.fetchone()[0]


def newDatapoint(id, enter: bool, cursor):
    statement = (
        'INSERT INTO libby.capacity_datapoint (library_id, direction) VALUES (%s, %s)'
    )
    cursor.execute(statement, (id, enter))




@app.route('/api/libraries/<int:library_id>')
def get_library(library_id:int):
   
    
    # Current Count
    cursor = connection.cursor()
    count = get_current_library_count(library_id, cursor)
    cursor.close()
    return count

def get_current_library_count(library_id, cursor)->int:
    today_start = datetime.datetime.today()
    statement = (
        '''
        with today as(
        select * from 
        libby.library natural join libby.capacity_datapoint
        where library.id = %s and time > %s
        ),
        ins as(
        select count(*) as inCOunt from today
        where direction = true
        ),
        outs as(
        select count(*) as outCount from today
        where direction = false
        )
        select inCount - (select outCount from outs) from ins
        ''' 
    )
    cursor.execute(statement, (library_id, today_start))
    result = cursor.fetchone()
    
    # Make sure we actually got a value
    if result and result[0] is not None:
        return int(result[0])
    
    return 0


