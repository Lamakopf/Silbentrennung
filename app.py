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

@app.route('/health')
def health_check():
    return "Healthy", 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)

