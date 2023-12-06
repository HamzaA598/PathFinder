from flask import Flask, render_template, request
from pymongo import MongoClient

app = Flask(__name__)
# mongodb atlas
mongo_uri = "your_mongodb_atlas_connection_string"
client = MongoClient(mongo_uri)
db = client.get_database("your_database_name")
collection = db.get_collection("your_collection_name")

i = 0

questions = ["Lorem", "ipsum", "dolor", "sit", "amet"]

@app.route('/')
def index():
    global i
    i = (i + 1) % len(questions)
    question = questions[i]
    return render_template('index.html', question=question)

@app.route('/submit', methods=['POST'])
def submit():
    # Retrieve user's answer from the form
    user_answer = request.form.get('answer')

    # Insert the user's answer into the MongoDB collection
    # collection.insert_one({'answer': user_answer})
    print(user_answer)

    # Redirect to the index route to fetch a new question
    return index()


if __name__ == '__main__':
    app.run(debug=True)
