from flask import Flask, render_template, request, jsonify
import json
import os
from datetime import datetime  # Импортируем модуль datetime

app = Flask(__name__)

# Функция для чтения комментариев из JSON файла
def read_comments():
    if not os.path.exists('comments.json'):
        return []
    with open('comments.json', 'r') as f:
        return json.load(f)

# Функция для записи комментариев в JSON файл
def write_comments(comments):
    with open('comments.json', 'w') as f:
        json.dump(comments, f)

@app.route('/')
def index():
    comments = read_comments()
    return render_template('index.html', comments=comments)

@app.route('/add_comment', methods=['POST'])
def add_comment():
    name = request.form['name']
    email = request.form['email']
    comment = request.form['comment']

    # Получаем текущую дату и время
    timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    new_comment = {
        'name': name,
        'email': email,
        'comment': comment,
        'timestamp': timestamp  # Добавляем дату и время
    }

    comments = read_comments()
    comments.append(new_comment)
    write_comments(comments)

    return jsonify(new_comment)

if __name__ == '__main__':
    app.run(debug=True)
