from flask import Flask, request
import smtplib
from email.mime.text import MIMEText
import os
import requests

app = Flask(__name__)

@app.route('/submit-form', methods=['POST'])
def submit_form():
    recaptcha_response = request.form.get('g-recaptcha-response')

    google_recaptcha_secret_key = os.environ.get('google_recaptcha_secret_key')

    verify_url = 'https:/www.google.com/recaptcha/api/siteverify'
    data = {
        'secret': google_recaptcha_secret_key,
        'response': recaptcha_response,
        'remoteip': request.remote_addr # optional but good practice
    }
    response = requests.post(verify_url, data=data)
    result = response.json()
    print(result)
    if not result['success']:
       # Handle failure (likely bot)
       return 'Invalid CAPTCHA', 400

    name = request.form['name']
    email = request.form['email']
    message = request.form['message']

    # Email config
    sender = 'forms@medicaputare.co.za'
    recipient = 'queries@medicaputare.co.za'
    msg = MIMEText(f"Name: {name}\nEmail: {email}\nMessage:\n{message}")
    msg['Subject'] = f'Message from {name}'
    msg['From'] = sender
    msg['To'] = recipient

    try:
        with smtplib.SMTP('mail.medicaputare.co.za', 587) as server:
            server.starttls()
            forms_mail_password = os.environ.get('forms_mail_pword')
            server.login(sender, forms_mail_password)
            server.sendmail(sender, recipient, msg.as_string())
        return 'Message sent!'
    except Exception as e:
        return f'Error: {str(e)}'

if __name__ == '__main__':
    app.run(port=5001)