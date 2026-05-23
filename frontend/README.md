JobShield - AI Job Post Authenticator

JobShield is a full-stack AI application designed to protect job seekers from employment scams. By leveraging a deep learning model (LSTM) trained on over 18,000 real and fraudulent job postings, this tool analyzes job descriptions in real-time to detect linguistic patterns, keyword clusters, and structural anomalies associated with fraud.
🚀 Key Features

    Real-Time Analysis: Instant feedback on job descriptions using a trained Neural Network.

    Hybrid Detection System: Combines a Python-based LSTM model for deep semantic analysis with client-side heuristic checks for immediate "Red Flag" detection (e.g., upfront payment requests, suspicious domains).

    Professional Dashboard: A clean, responsive React UI featuring a dynamic risk meter, confidence scoring, and detailed risk indicators.

    Secure API Integration: Flask-based REST API connecting the modern frontend to the Python AI engine.

🛠️ Tech Stack
Frontend (Client)

    Framework: React 19 (Vite)

    Language: TypeScript

    Styling: Tailwind CSS, Shadcn UI, Framer Motion (for animations)

    Icons: Lucide React

Backend (Server & AI)

    Framework: Flask (Python)

    Machine Learning: TensorFlow / Keras (LSTM Model)

    Data Processing: NumPy, Pickle

    API Security: Flask-CORS

⚙️ Installation & Setup

This project consists of two parts: the React frontend and the Flask backend. You must run both concurrently.
1. Backend Setup (Python)

Navigate to the backend directory and install the required dependencies.
Bash

cd backend

# Create a virtual environment (Optional but recommended)
python -m venv venv
# Windows: venv\Scripts\activate
# Mac/Linux: source venv/bin/activate

# Install dependencies
pip install flask flask-cors tensorflow numpy

# Run the API server
python app.py

The server will start at http://127.0.0.1:5000
2. Frontend Setup (React)

Open a new terminal, navigate to the frontend directory, and start the UI.
Bash

cd frontend

# Install Node dependencies
npm install 
# OR if you use Bun
bun install

# Start the development server
npm run dev

The application will be accessible at http://localhost:8080 (or similar)
🧠 How It Works

    Input: The user pastes a job description into the frontend interface.

    Preprocessing: Text is tokenized and padded to match the model's expected input shape.

    Inference: The LSTM model (loaded via fake_job_lstm_model.h5) processes the sequence to determine the probability of fraud.

    Result: The backend returns a JSON object containing the prediction_score, label ("Fraudulent" vs "Legitimate"), and confidence metrics.

    Visualization: The frontend renders a risk meter and highlights specific warning signs (e.g., "Urgency Language", "Unprofessional Email").


Abhinav Vishwakarma

    MCA Student at Kamla Nehru Institute of Technology

    Full Stack Developer & AI Enthusiast

Built as a project to combat the rising tide of employment fraud using Deep Learning.