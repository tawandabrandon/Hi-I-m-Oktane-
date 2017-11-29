from flask import Flask, render_template
from chatterbot import ChatBot
from chatterbot.trainers import ChatterBotCorpusTrainer

app = Flask(__name__)

english_bot = ChatBot("English Bot", storage_adapter="chatterbot.storage.SQLStorageAdapter")


@app.route("/")
def home():
    return render_template("index.html")

@app.route("/get/<string:query>")
def get_raw_response(query):
    return render_template("response.html",message = str(english_bot.get_response(query))), 201


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=9999)