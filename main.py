#Jonathan Zavialov

from flask import *

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("boot.html")

@app.route("/home")
def boot():
    return render_template("index.html")

app.run(host='0.0.0.0',port=80)
