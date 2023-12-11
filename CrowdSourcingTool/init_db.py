from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
from questions import QUESTIONS

app = Flask(__name__)

# mongodb atlas
SQLALCHEMY_DATABASE_URI = "mysql+mysqlconnector://{username}:{password}@{hostname}/{databasename}".format(
    username="PathFinderTool",
    password="youssif12345",
    hostname="PathFinderTool.mysql.pythonanywhere-services.com",
    databasename="PathFinderTool$default",
)
app.config["SQLALCHEMY_DATABASE_URI"] = SQLALCHEMY_DATABASE_URI
app.config["SQLALCHEMY_POOL_RECYCLE"] = 299
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)

class Question(db.Model):
    __tablename__ = "Question"
    id = db.Column(db.Integer, primary_key = True, autoincrement = True)
    text = db.Column(db.String)

class Answer(db.Model):
    __tablename__ = "Answer"
    id = db.Column(db.Integer, primary_key = True, autoincrement = True)
    text = db.Column(db.String)
    question_id = db.Column(db.Integer, db.ForeignKey('Question.id'))

db.create_all()

for q in QUESTIONS:
    record = Question(text = q)
    db.session.add(record)
db.session.commit()


# Sample route
@app.route('/')
def index():
    return "Hello World!"

if __name__ == '__main__':
    app.run(debug=True)
