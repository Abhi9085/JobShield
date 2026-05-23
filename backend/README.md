Fake Job Prediction API (Backend)

📌 Project Overview

This project serves as the Intelligence Engine for the JobShield application. It uses an LSTM-based Deep Learning model to detect fraudulent job postings with high accuracy (~95-98%).

The backend is built with Flask and exposes a RESTful API that the React frontend consumes. It handles text preprocessing (cleaning, tokenization, padding) and runs inference using a trained TensorFlow/Keras model.

🚀 Key Features

    Deep Learning Model: Utilizes a Long Short-Term Memory (LSTM) network to understand the context and sequence of words in job descriptions.

    API-First Design: Serves predictions via JSON to any client (Web, Mobile).

    Advanced Preprocessing: Automatically handles text cleaning (URL removal, lowercasing) and sequence padding before inference.

    Dual Deployment: Model is available in both .h5 (Keras) and .tflite (Edge/Mobile) formats.

    Imbalance Handling: Training process utilized SMOTE to balance the dataset, ensuring the model doesn't just guess "Legitimate" every time.

🛠️ Tech Stack

    Framework: Flask, Flask-CORS

    Machine Learning: TensorFlow, Keras

    Data Processing: Pandas, NumPy, Scikit-learn, Pickle

    Model Architecture: Embedding Layer -> LSTM Layer -> Dense Layers -> Sigmoid Output

📂 Folder Structure
Plaintext

backend/
├── instance
|       ├──jobshield.db         # database for user feedback
├── app.py                      # Main entry point: Flask API Server
├── converting_model.py         # Utility to convert Keras model to TFLite
├── EDA_FAKE_JOB.ipynb          # Notebook: Exploratory Data Analysis & Visualization
├── Model_Training.ipynb        # Notebook: Training the LSTM model
├── fake_job_lstm_model.keras   # The trained AI Model (Load this one for Flask)
├── fake_job_lstm_model.tflite  # Optimized model for mobile deployment
├── tokenizer.pkl               # Saved tokenizer (Critical for preprocessing new text)
├── requirements.txt            # Python dependencies
└── fake_job_postings.csv       # Raw Training Data

📊 Model Performance

The model was evaluated using Precision, Recall, and F1-Score to ensure robustness against class imbalance.

    Accuracy: ~95%

    Architecture:

        Embedding Layer: Maps words to dense vectors.

        LSTM Layer: Captures sequential patterns in text.

        Dropout: Prevents overfitting.

        Sigmoid: Outputs a probability score (0.0 to 1.0).

⚡ Setup & Run Instructions

1. Environment Setup

It is recommended to use a virtual environment.
Bash

# Windows
python -m venv venv
venv\Scripts\activate

# Mac/Linux
python3 -m venv venv
source venv/bin/activate

2. Install Dependencies
Bash

pip install -r requirements.txt
# Ensure you also have flask-cors installed
pip install flask-cors

3. Run the API Server
Bash

python app.py

The server will start at http://127.0.0.1:5000.
4. API Usage (Example)

Endpoint: POST /predict Content-Type: application/json

Request Body:
JSON

{
  "combined_text": "Data Entry Clerk needed immediately. Work from home. No experience required. Send money for software kit."
}

Response:
JSON

{
  "result": "Fraudulent",
  "score": 0.98,
  "status": "success"
}

📝 Author

Abhinav Vishwakarma

    Role: Backend Logic & AI Model Development

    Focus: Deep Learning, NLP, API Development