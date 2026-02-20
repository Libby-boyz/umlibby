from flask import Flask
import mysql.connector
import signal
import sys

app = Flask(__name__)
signal.signal(signal.SIGTERM, lambda : sys.exit(5))

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

