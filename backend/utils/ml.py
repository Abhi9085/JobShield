import pickle
import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.sequence import pad_sequences

MAX_SEQUENCE_LENGTH = 200

print("Loading tokenizer...")
try:
    with open("tokenizer.pkl", "rb") as f:
        tokenizer = pickle.load(f)
    print("Tokenizer loaded!")
except Exception as e:
    print(f"Error loading tokenizer: {e}")
    tokenizer = None

print("Loading Keras model...")
try:
    model = load_model("fake_job_lstm_model.keras")
    print("Keras model loaded!")
except Exception as e:
    print(f"Error loading model: {e}")
    model = None

def predict_job_text(text):
    if not tokenizer or not model:
        raise Exception("ML Model or Tokenizer not loaded properly")
        
    sequence = tokenizer.texts_to_sequences([text])
    input_data = pad_sequences(sequence, maxlen=MAX_SEQUENCE_LENGTH)
    
    prediction_score = float(model.predict(input_data)[0][0])
    result = "Fraudulent" if prediction_score > 0.5 else "Legitimate"
    
    return prediction_score, result