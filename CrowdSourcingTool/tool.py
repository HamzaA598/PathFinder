from flask import Flask, redirect, render_template, request, url_for
from pymongo import MongoClient

app = Flask(__name__)
# mongodb atlas
mongo_uri = "mongodb+srv://pathfinder_tool:wUu8Sdd77eYSTy7X@tooldb.ym2vggy.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(mongo_uri)
db = client.get_database("tooldb")
collection = db.get_collection("answers")

i = -1

questions = ["Lorem", "ipsum", "dolor", "sit", "amet"]

@app.route('/')
def index():
    question = get_next_question()
    return render_template('index.html', question=question)

@app.route('/submit', methods=['POST'])
def submit():
    # Retrieve user's answer from the form
    user_answer = request.form.get('answer')

    # Insert the user's answer into the MongoDB collection
    collection.insert_one({'answer': user_answer})

    print(user_answer)
    print(i)
    new_question = get_next_question()
    
    # Redirect to the index route to fetch a new question
    return {"new_question": new_question}


def get_next_question():
    global i
    i = (i + 1) % len(questions)
    return questions[i]

if __name__ == '__main__':
    app.run(debug=True)
