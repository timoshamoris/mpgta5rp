from flask import Flask, jsonify
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)

@app.route('/get_topics', methods=['GET'])
def get_topics():
    url = "https://forum.gta5rp.com/forums/meroprijatija-na-servere.549/"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    }

    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')
        topics = soup.find_all('li', class_='discussionListItem')
        data = []
        
        for topic in topics:
            title = topic.find('a', class_='PreviewTooltip').text.strip()
            status = topic.find('span', class_='discussionTag').text.strip()
            
            if status == "Рассмотрено":
                data.append({"title": title, "status": status})
        
        return jsonify(data)
    else:
        return jsonify({"error": "Не удалось получить данные"}), 500

if __name__ == '__main__':
    app.run(debug=True)
