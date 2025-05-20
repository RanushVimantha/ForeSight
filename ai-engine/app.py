from flask import Flask, request, jsonify
from flask_cors import CORS 
import joblib
import os
import numpy as np
import pandas as pd
from simulate import run_simulation
from explain_instance import explain_instance

app = Flask(__name__)
CORS(app)

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
        data = request.get_json()

        # Defensive defaults if frontend sends null
        budget = data.get("budget_rs") or 1000000
        duration = data.get("duration_days") or 90
        team = data.get("team_size") or 5

        features = [
            data.get("project_type", "Web"),
            budget,
            duration,
            team,
            data.get("scope_changes", 1),
            data.get("client_type", "Local"),
            data.get("technology_stack", "React"),
            data.get("developer_experience_avg", 3.0),
            data.get("agile_practice", "Yes"),
            data.get("client_rating", 3),
            data.get("past_delays", 1)
        ]

        # Reshape and predict
        features_df = pd.DataFrame([features], columns=[
            "project_type", "budget_rs", "duration_days", "team_size", "scope_changes",
            "client_type", "technology_stack", "developer_experience_avg", "agile_practice",
            "client_rating", "past_delays"
        ])

        prediction = model.predict(features_df)[0]
        confidence = max(model.predict_proba(features_df)[0]) * 100

        return jsonify({
            "prediction": prediction,
            "confidence": round(confidence, 2)
        })
    except Exception as e:
        print("❌ Error in /predict-risk:", e)
        return jsonify({"error": "Server crashed", "details": str(e)}), 500


@app.route("/simulate-risk", methods=["POST"])
def simulate_risk():
    try:
        data = request.get_json()
        budget_mean = data.get("budget_mean") or 1000000
        budget_std = data.get("budget_std") or 200000
        duration_mean = data.get("duration_mean") or 90
        duration_std = data.get("duration_std") or 10

        # Run the simulation (replace with your actual logic)
        budget_results = np.random.normal(budget_mean, budget_std, 1000)
        duration_results = np.random.normal(duration_mean, duration_std, 1000)

        prob_budget_overrun = (budget_results > budget_mean * 1.1).mean() * 100
        prob_duration_overrun = (duration_results > duration_mean * 1.1).mean() * 100

        level = "Low"
        if prob_budget_overrun > 50 or prob_duration_overrun > 50:
            level = "High"
        elif prob_budget_overrun > 25 or prob_duration_overrun > 25:
            level = "Medium"

        return jsonify({
            "prob_budget_overrun": round(prob_budget_overrun, 2),
            "prob_duration_overrun": round(prob_duration_overrun, 2),
            "risk_level": level
        })
    except Exception as e:
        print("❌ Error in /simulate-risk:", e)
        return jsonify({"error": "Simulation error", "details": str(e)}), 500

    
    
@app.route("/explain-instance", methods=["POST"])
def explain_instance_api():
    try:
        input_data = request.json
        result = explain_instance(input_data)
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500



if __name__ == "__main__":
    app.run(debug=True, port=5001)
