from flask import Flask

app = Flask(__name__)

process.on('SIGTERM', () => shutdown('SIGTERM'));

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"
