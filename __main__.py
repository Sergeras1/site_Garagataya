from flask import Flask, render_template, request, jsonify
import json
import os
from datetime import datetime  # Импортируем модуль datetime
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

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

# Функция для отправки email
def send_email(name, email, comment):
    sender_email = "nadyagara@yandex.ru"  # Ваш email Яндекса
    receiver_email = "nadyagara@yandex.ru"  # Тот же email (для теста)
    password = "mvlflrjyuctfwrez"  # Пароль приложения из Яндекса

    subject = f"Новый комментарий от {name}"
    body = f"Имя: {name}\nEmail: {email}\nКомментарий: {comment}"

    msg = MIMEText(body)
    msg['Subject'] = subject
    msg['From'] = sender_email
    msg['To'] = receiver_email

    try:
        # Используем SMTP_SSL для подключения через SSL
        server = smtplib.SMTP_SSL('smtp.yandex.ru', 465)
        server.login(sender_email, password)
        server.sendmail(sender_email, receiver_email, msg.as_string())
        server.quit()
        print("Письмо отправлено успешно")
    except smtplib.SMTPAuthenticationError as e:
        print(f"Ошибка аутентификации: {e}")
    except Exception as e:
        print(f"Ошибка при отправке письма: {e}")

@app.route('/')
def index():
    comments = read_comments()
    return render_template('index.html', comments=comments)

# Добавляем маршрут для страницы "Педагогические самоцветы"
@app.route('/pedagog_samocv')
def pedagog_samocv():
    return render_template('pedagog_samocv_html.html')

@app.route('/v_pom_rodit_Igraite_sami')
def v_pom_rodit_Igraite_sami():
    return render_template('v_pom_rodit_Igraite_sami.html')

@app.route('/interes_html')
def interes_html():
    return render_template('interes_html.html')

@app.route('/samorodki_html')
def samorodki_html():
    return render_template('samorodki_html.html')

@app.route('/ssilki_html')
def ssilki_html():
    return render_template('ssilki_html.html')

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

    # Отправляем комментарий на почту
    send_email(name, email, comment)

    return jsonify(new_comment)

if __name__ == '__main__':
    app.run(debug=True)
