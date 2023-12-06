from flask import Flask, render_template, request

app = Flask(__name__)
i = 0

questions = ["Lorem", "ipsum", "dolor", "sit", "amet"]

@app.route('/')
def index():
    global i
    i = (i + 1) % len(questions)
    question = questions[i]
    return render_template('index.html', question=question)


if __name__ == '__main__':
    app.run(debug=True)
