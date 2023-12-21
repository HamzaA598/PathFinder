from flask import Flask, redirect, render_template, request, url_for
from flask_sqlalchemy import SQLAlchemy
from questions import QUESTIONS

app = Flask(__name__)
# sql db
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

i = -1

def get_next_question():
    global i
    i = (i + 1) % len(QUESTIONS)
    return QUESTIONS[i]

@app.route('/')
def index():
    question = get_next_question()
    return render_template('index.html', question=question)

@app.route('/submit', methods=['POST'])
def submit():
    global i
    # Retrieve user's answer from the form
    user_answer = request.form.get('answer')

    answer_record = Answer(text = user_answer, question_id = )

    # Insert the user's answer into the sql db

    db.session.add(answer_record)
    db.session.commit()

    new_question = get_next_question()
    
    # Redirect to the index route to fetch a new question
    return {"new_question": new_question}


@app.route('/skip', methods=['GET'])
def skip():
    new_question = get_next_question()
    return {"new_question": new_question}

if __name__ == '__main__':
    app.run(debug=True)


# Models
class Question(db.Model):
    __tablename__ = "Question"
    id = db.Column(db.Integer, primary_key = True, autoincrement = True)
    text = db.Column(db.String(length = 1024))

class Answer(db.Model):
    __tablename__ = "Answer"
    id = db.Column(db.Integer, primary_key = True, autoincrement = True)
    text = db.Column(db.String(length = 4096))
    question_id = db.Column(db.Integer, db.ForeignKey('Question.id'))