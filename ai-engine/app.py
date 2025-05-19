from flask import Flask, request, jsonify
import joblib
import os
import numpy as np
from simulate import run_simulation
from explain_instance import explain_instance

app = Flask(__name__)

# Model paths
MODEL_PATH = os.path.join("models", "risk_model.pkl")
FEATURES_PATH = os.path.join("models", "feature_columns.pkl")

# Load model and feature list at startup
try:
    model = joblib.load(MODEL_PATH)
    feature_columns = joblib.load(FEATURES_PATH)
    print("✅ Model and features loaded successfully.")
except Exception as e:
    print(f"❌ Error loading model: {e}")
    model = None
    feature_columns = []

@app.route("/", methods=["GET"])
def home():
    return jsonify({"status": "AI API is running"}), 200

@app.route("/predict-risk", methods=["POST"])
def predict_risk():
    try:
        input_data = request.json
        input_vector = [input_data.get(f, 0) for f in feature_columns]
        prediction = model.predict([input_vector])[0]
        confidence = model.predict_proba([input_vector]).max()
        return jsonify({
            "prediction": prediction,
            "confidence": round(float(confidence) * 100, 2)
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/simulate-risk", methods=["POST"])
def simulate_risk():
    try:
        data = request.json
        budget_mean = float(data["budget_mean"])
        budget_std = float(data["budget_std"])
        duration_mean = float(data["duration_mean"])
        duration_std = float(data["duration_std"])

        result = run_simulation(
            budget_mean=budget_mean,
            budget_std=budget_std,
            duration_mean=duration_mean,
            duration_std=duration_std
        )

        return jsonify(result)

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
    
@app.route("/explain-instance", methods=["POST"])
def explain_instance_api():
    try:
        input_data = request.json
        result = explain_instance(input_data)
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500



if __name__ == "__main__":
    app.run(debug=True, port=5000)
