# import os

# # Disable OneDNN & Reduce TensorFlow Logging (MUST BE AT THE TOP)
# os.environ["TF_ENABLE_ONEDNN_OPTS"] = "0"
# os.environ["TF_CPP_MIN_LOG_LEVEL"] = "3"

# from flask import Flask, jsonify
# from config import Config
# from extensions import db, cors

# # Import Route Blueprints
# from routes.auth import auth_bp
# from routes.predict import predict_bp
# from routes.admin import admin_bp

# def create_app():
#     app = Flask(__name__)
#     app.config.from_object(Config)

#     # Initialize Extensions
#     db.init_app(app)
#     cors.init_app(app, resources={r"/*": {"origins": ["https://jobshield-backend-yk7z.onrender.com/"]}})

#     # Register Route Blueprints
#     app.register_blueprint(auth_bp)
#     app.register_blueprint(predict_bp)
#     app.register_blueprint(admin_bp)

#     @app.route("/", methods=["GET"])
#     def home():
#         return jsonify({"status": "Backend is running!"})

#     return app

# app = create_app()

# if __name__ == "__main__":
#     app = create_app()
    
#     # Initialize the database within the app context
#     with app.app_context():
#         db.create_all()
        
#     app.run(debug=True, port=5000)

import os

# Disable OneDNN & Reduce TensorFlow Logging (MUST BE AT THE TOP)
os.environ["TF_ENABLE_ONEDNN_OPTS"] = "0"
os.environ["TF_CPP_MIN_LOG_LEVEL"] = "3"

from flask import Flask, jsonify
from config import Config
from extensions import db, cors

# Import Route Blueprints
from routes.auth import auth_bp
from routes.predict import predict_bp
from routes.admin import admin_bp

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Initialize Extensions
    db.init_app(app)
    
    # --- THE CORS ---
    cors.init_app(app, resources={
        r"/*": {
            "origins": "*",
            "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            "allow_headers": "*"
        }
    })

    # Register Route Blueprints
    app.register_blueprint(auth_bp)
    app.register_blueprint(predict_bp)
    app.register_blueprint(admin_bp)

    @app.route("/", methods=["GET"])
    def home():
        return jsonify({"status": "Backend is running!"})

    return app

# --- THE GUNICORN FIX: Define app globally so Render finds it ---
app = create_app()

if __name__ == "__main__":
    # Initialize the database within the app context
    with app.app_context():
        db.create_all()
        
    app.run(debug=True, port=5000)
