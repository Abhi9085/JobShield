import tensorflow as tf
import pickle

# Load model
model = tf.keras.models.load_model("fake_job_lstm_model.keras")

# Load tokenizer
with open("tokenizer.pkl", "rb") as f:
    tokenizer = pickle.load(f)

# Preprocess function (adjust based on your training)
def preprocess(text):
    seq = tokenizer.texts_to_sequences([text])
    padded = tf.keras.preprocessing.sequence.pad_sequences(seq, maxlen=100)
    return padded

# CLI loop
while True:
    text = input("\nEnter job description (or type 'exit'): ")

    if text.lower() == "exit":
        break

    processed = preprocess(text)
    prediction = model.predict(processed)[0][0]

    if prediction > 0.5:
        print(f"Prediction: FAKE JOB ({prediction:.2f})")
    else:
        print(f"Prediction: REAL JOB ({prediction:.2f})")