from flask import Flask, request, jsonify
import joblib
import numpy as np
import os

app = Flask(__name__)

# Placeholder model paths
MODEL_PATH = os.path.join("models", "risk_model.pkl")
FEATURES_PATH = os.path.join("models", "feature_columns.pkl")

@app.route("/", methods=["GET"])
def home():
    return jsonify({"status": "API is running"}), 200

@app.route("/predict-risk", methods=["POST"])
def predict_risk():
    try:
        # Load model + features
        model = joblib.load(MODEL_PATH)
        features = joblib.load(FEATURES_PATH)

        # Parse input
        input_data = request.json
        input_vector = [input_data.get(f, 0) for f in features]
        prediction = model.predict([input_vector])[0]
        proba = model.predict_proba([input_vector]).max()

        return jsonify({
            "prediction": prediction,
            "confidence": round(float(proba) * 100, 2)
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)
