from flask import Flask
import mysql.connector
import signal
import sys
import os

app = Flask(__name__)
signal.signal(signal.SIGTERM, lambda: sys.exit(5))

connection = mysql.connector.connect(
    host="127.0.0.1",
    port=3306,
    user='root',  # os.environ['MYSQL_USER'],
    password='rootpw'  # os.environ['MYSQL_PASSWORD']
)


@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"


@app.route('/api/<string:location>/<boolean:direction>', methods=["GET", "POST"])
def library_enter(location, direction):
    cursor = connection.cursor()
    # id = getLocationId(location, cursor)
    newDatapoint(0, direction, cursor)
    cursor.close()

# def getLocationId(name, cursor):
#     cursor.execute(('SELECT id FROM finus.library WHERE name = %name',), (name,) )  
#     return cursor.fetchone()


def newDatapoint(id, enter: bool, cursor):
    addDatapoint = ('INSERT INTO finus.datapoint (dp) VALUES (%(id), %(enter))')
    cursor.execute(addDatapoint, { id: id, enter: enter }) 
