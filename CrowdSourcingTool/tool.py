from flask import Flask, render_template, request

app = Flask(__name__)
i = 1

@app.route('/')
def index():
    global i
    # logic to fetch quesiton here
    i += 1
    question = "Replace this text with your question."
    return render_template('index.html', question=question)


if __name__ == '__main__':
    app.run(debug=True)
