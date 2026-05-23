import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SQLALCHEMY_DATABASE_URI = 'sqlite:///jobshield.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    SMTP_SERVER = "smtp.gmail.com"
    SMTP_PORT = 587
    MAIL_USERNAME = os.getenv("MAIL_USERNAME")
    MAIL_PASSWORD = os.getenv("MAIL_PASSWORD")
    
    # Authorized Admins
    ADMIN_EMAILS = [email.strip() for email in os.getenv("ADMIN_EMAILS", "").split(",") if email]