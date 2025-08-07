import os, requests
from flask import Flask, render_template, jsonify
#from dotenv import load_dotenv

#load_dotenv()

app = Flask(__name__, template_folder="templates", static_folder="static")
#app.secret_key = os.getenv("SECRET_KEY")


# TODO : функции для корректной работы приложения
def generate_quote():
    url = "http://api.quotable.io/random"

    response = requests.get(url)
    data = response.json()

    generated_quote = f"{data['content']} - {data['author']}"

    return generated_quote


# TODO : routes сайта
@app.route("/", methods=["GET"])
def index():
    """Функция для запуска таймера и отображения сгенерированной цитаты"""
    return render_template("index.html", minutes=25, seconds=0, quote=generate_quote())


@app.route("/api/quote", methods=["GET"])
def get_quote():
    """Возвращает случайную цитату в формате JSON"""
    return jsonify({"quote": generate_quote()})


#! ЗАПУСК ПРИЛОЖЕНИЯ
if __name__ == "__main__":
    app.run(debug=True)
