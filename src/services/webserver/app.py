from flask import Flask
import mysql.connector
import signal
import sys
import os

app = Flask(__name__)
signal.signal(signal.SIGTERM, lambda: sys.exit(5))

connection = mysql.connector.connect(
    host="db",
    port=3306,
    user='root',
    password=os.environ['MYSQL_ROOT_PASSWORD'],
    database='libby'
)


@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"


@app.route('/api/<location>/<direction>', methods=["GET", "POST"])
def library_enter(location, direction):
    print('location: ' + location, file=sys.stderr)
    print('direction: ' + direction, file=sys.stderr)
    cursor = connection.cursor()
    id = getLocationId(location, cursor)
    newDatapoint(id, (direction == 'enter'), cursor)
    cursor.close()
    return 'ok'


def getLocationId(name, cursor):
    statement = (
        'SELECT id FROM libby.library WHERE name = %s'
    )
    print('name: ' + name, file=sys.stderr)
    cursor.execute(statement, (name,))
    return cursor.fetchone()[0]


def newDatapoint(id, enter: bool, cursor):
    statement = (
            'INSERT INTO libby.capacity_datapoint (library_id, direction) VALUES (%s, %s)'
    )
    cursor.execute(statement, (id, enter))
