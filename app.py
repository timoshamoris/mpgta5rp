from flask import Flask, request, jsonify
from transformers import pipeline

app = Flask(__name__)

# Загружаем модель для анализа текста
analyzer = pipeline("text-classification", model="distilbert-base-uncased-finetuned-sst-2-english")

@app.route("/")
def home():
    return "Добро пожаловать в нейросетевой анализатор текста!"

@app.route("/analyze", methods=["POST"])
def analyze_text():
    data = request.get_json()
    text = data.get("text", "")
    
    if not text:
        return jsonify({"error": "Введите текст"}), 400
    
    result = analyzer(text)
    return jsonify(result)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
