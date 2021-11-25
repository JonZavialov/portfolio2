# Jonathan Zavialov

from flask import *

app = Flask(__name__)

@app.route("/")
def boot():
    return render_template("boot.html")

@app.route("/home")
def home():
    app = request.args.get('app', default = "", type = str)
    return render_template("index.html", app=app)

@app.route("/404")
def lost():
    return render_template("404.html")

@app.errorhandler(404)
def page_not_found(e):
    return render_template("404.html"), 404

app.run(host='0.0.0.0',port=80)