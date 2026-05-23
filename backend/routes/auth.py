import random
from flask import Blueprint, request, jsonify
from config import Config
from utils.email import send_email_otp

auth_bp = Blueprint('auth', __name__)

# In-memory storage for OTPs
otp_storage = {}

@auth_bp.route('/api/auth/send-otp', methods=['POST'])
def send_otp():
    data = request.json
    email = data.get('email')
    
    if email not in Config.ADMIN_EMAILS:
        return jsonify({"error": "Unauthorized"}), 403
    
    otp = str(random.randint(100000, 999999))
    otp_storage[email] = otp
    print(f"OTP for {email}: {otp}")
    
    if send_email_otp(email, otp):
        return jsonify({"message": "Sent"}), 200
    else:
        return jsonify({"error": "Failed to send email"}), 500

@auth_bp.route('/api/auth/verify-otp', methods=['POST'])
def verify_otp():
    data = request.json
    email = data.get('email')
    user_otp = data.get('otp')
    
    if otp_storage.get(email) == user_otp:
        del otp_storage[email]
        return jsonify({"message": "Success"}), 200
    return jsonify({"error": "Invalid OTP"}), 401