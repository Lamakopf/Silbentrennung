from flask import Flask, request, jsonify, send_from_directory
import pyphen

app = Flask(__name__, static_url_path='', static_folder='.')
dic = pyphen.Pyphen(lang='de_DE')

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/split-text', methods=['POST'])
def split_text():
    text = request.json.get('text', '')
    words = text.split()
    split_words = [dic.inserted(word) for word in words]
    return jsonify({'splitWords': split_words})

if __name__ == '__main__':
    app.run(debug=True)
