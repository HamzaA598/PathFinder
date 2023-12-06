from flask import Flask, render_template, request

app = Flask(__name__)
i = 1

@app.route('/')
def index():
    global i
    i+=1
    return str(i)


if __name__ == '__main__':
    app.run(debug=True)
