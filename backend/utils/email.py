import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from config import Config

def send_email_otp(recipient_email, otp):
    try:
        msg = MIMEMultipart()
        msg['From'] = Config.MAIL_USERNAME
        msg['To'] = recipient_email
        msg['Subject'] = "JobShield Login Code"
        body = f"<h2>Your Admin OTP is: {otp}</h2>"
        msg.attach(MIMEText(body, 'html'))

        server = smtplib.SMTP(Config.SMTP_SERVER, Config.SMTP_PORT)
        server.starttls()
        server.login(Config.MAIL_USERNAME, Config.MAIL_PASSWORD)
        server.sendmail(Config.MAIL_USERNAME, recipient_email, msg.as_string())
        server.quit()
        return True
    except Exception as e:
        print(f"Email Error: {e}")
        return False