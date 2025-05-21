from flask import Flask, request, jsonify
from flask_cors import CORS 
import joblib
import os
import numpy as np
import pandas as pd
import json
from sklearn.preprocessing import LabelEncoder
from datetime import datetime
import csv

from simulate import run_simulation
from explain_instance import explain_instance
from generate_mitigations import generate_mitigations
app = Flask(__name__)
CORS(app)

# === Load model & metadata ===
MODEL_PATH = os.path.join("models", "risk_model.pkl")
META_PATH = os.path.join("models", "model_meta.json")

try:
    model = joblib.load(MODEL_PATH)
    with open(META_PATH, "r") as f:
        meta = json.load(f)
        class_labels = meta["target_classes"]
        feature_columns = meta["feature_columns"]
        label_columns = meta["label_columns"]
    print("✅ Model and metadata loaded.")
except Exception as e:
    print(f"❌ Error loading model/meta: {e}")
    model, class_labels, feature_columns, label_columns = None, [], [], []

# === Encoders per column ===
encoders = {}
def encode_input(df):
    for col in label_columns:
        if col not in encoders:
            encoders[col] = LabelEncoder()
            df[col] = encoders[col].fit_transform(df[col])
        else:
            df[col] = encoders[col].transform(df[col])
    return df

@app.route("/", methods=["GET"])
def home():
    return jsonify({"status": "AI API is running"}), 200

@app.route("/predict-risk", methods=["POST"])
def predict_risk():
    try:
        data = request.get_json()
        features = [
            data.get("project_type", "Web"),
            data.get("budget_rs", 1000000),
            data.get("duration_days", 90),
            data.get("team_size", 5),
            data.get("scope_changes", 1),
            data.get("client_type", "Local"),
            data.get("technology_stack", "React"),
            data.get("developer_experience_avg", 3.0),
            data.get("agile_practice", "Yes"),
            data.get("client_rating", 3),
            data.get("past_delays", 1)
        ]

        df = pd.DataFrame([features], columns=feature_columns)
        df = encode_input(df)
        prediction = model.predict(df)[0]
        confidence = max(model.predict_proba(df)[0]) * 100

        return jsonify({
            "prediction": class_labels[prediction],
            "confidence": round(confidence, 2)
        })
    except Exception as e:
        print("❌ Error in /predict-risk:", e)
        return jsonify({"error": str(e)}), 500

@app.route("/simulate-risk", methods=["POST"])
def simulate_risk():
    try:
        data = request.get_json()
        budget_mean = data.get("budget_mean") or 1000000
        budget_std = data.get("budget_std") or 200000
        duration_mean = data.get("duration_mean") or 90
        duration_std = data.get("duration_std") or 10

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
        return jsonify({"error": str(e)}), 500

@app.route("/explain-instance", methods=["POST"])
def explain_instance_api():
    try:
        input_data = request.json
        result = explain_instance(input_data)
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/update-model", methods=["POST"])
def update_model():
    try:
        data = request.get_json()
        actual_label = data.get("actual_risk_level")
        if not actual_label:
            return jsonify({"error": "Missing 'actual_risk_level'"}), 400

        features = [
            data.get("project_type", "Web"),
            data.get("budget_rs", 1000000),
            data.get("duration_days", 90),
            data.get("team_size", 5),
            data.get("scope_changes", 1),
            data.get("client_type", "Local"),
            data.get("technology_stack", "React"),
            data.get("developer_experience_avg", 3.0),
            data.get("agile_practice", "Yes"),
            data.get("client_rating", 3),
            data.get("past_delays", 1)
        ]

        df = pd.DataFrame([features], columns=feature_columns)
        df = encode_input(df)
        df = df.fillna(0)

        y_encoded = class_labels.index(actual_label)
        model.partial_fit(df, [y_encoded])
        joblib.dump(model, MODEL_PATH)

        # === Log to CSV ===
        try:
            log_path = os.path.join("models", "project_log.csv")
            row = {
               "project_id": data.get("project_id"),
    "timestamp": datetime.now().isoformat(),
    "project_type": data.get("project_type", "Web"),
    "budget_rs": data.get("budget_rs", 1000000),
    "duration_days": data.get("duration_days", 90),
    "team_size": data.get("team_size", 5),
    "scope_changes": data.get("scope_changes", 1),
    "client_type": data.get("client_type", "Local"),
    "technology_stack": data.get("technology_stack", "React"),
    "developer_experience_avg": data.get("developer_experience_avg", 3.0),
    "agile_practice": data.get("agile_practice", "Yes"),
    "client_rating": data.get("client_rating", 3),
    "past_delays": data.get("past_delays", 1),
    "actual_risk_level": actual_label
            }
            
            file_exists = os.path.isfile(log_path)
            with open(log_path, mode='a', newline='') as csvfile:
                writer = csv.DictWriter(csvfile, fieldnames=row.keys())
                if not file_exists:
                    writer.writeheader()
                writer.writerow(row)

            print(f"✅ Project logged to {log_path}")

        except Exception as log_err:
            print(f"❌ Failed to log project: {log_err}")

        return jsonify({"message": "Model updated successfully"}), 200
    except Exception as e:
        print("❌ Error in /update-model:", e)
        return jsonify({"error": str(e)}), 500
    
@app.route("/latest-risk/<int:project_id>", methods=["GET"])
def get_latest_risk(project_id):
    try:
        log_path = os.path.join("models", "project_log.csv")
        if not os.path.exists(log_path):
            return jsonify({"risk_level": None}), 200

        df = pd.read_csv(log_path, on_bad_lines='skip')
        df = df[df["project_id"] == project_id]
        if df.empty:
            return jsonify({"risk_level": None}), 200

        latest_entry = df.sort_values("timestamp", ascending=False).iloc[0]
        return jsonify({"risk_level": latest_entry["actual_risk_level"]}), 200
    except Exception as e:
        print("❌ Error in /latest-risk:", e)
        return jsonify({"error": str(e)}), 500
    
@app.route("/generate-mitigations", methods=["POST"])
def generate_mitigations():
    try:
        data = request.get_json()
        risks = data.get("risks", [])

        # Risk category to strategy mapping
        strategy_map = {
            "Technical": ["Conduct integration testing", "Use standard frameworks"],
            "Budget": ["Strict budget monitoring", "Use open-source libraries"],
            "Security": ["Encrypt sensitive data", "Implement firewalls", "Educate team on best practices"],
            "Data": ["Engage early with data providers", "Use placeholder datasets"],
            "Usability": ["Add onboarding training", "Iterative UX testing"],
            "Scope": ["Break down scope into phases", "Apply agile sprint planning"],
        }

        suggested = set()
        for risk in risks:
            category = risk.get("category")
            if category and category in strategy_map:
                for s in strategy_map[category]:
                    suggested.add(s)

        return jsonify({"mitigations": sorted(list(suggested))})
    except Exception as e:
        print("❌ Error in /generate-mitigations:", e)
        return jsonify({"error": str(e)}), 500
    
@app.route("/generate-mitigations", methods=["POST"])
def suggest_mitigations():
    try:
        risks = request.get_json()
        output = generate_mitigations(risks)
        return jsonify({"mitigations": output}), 200
    except Exception as e:
        print("❌ Error in /generate-mitigations:", e)
        return jsonify({"error": str(e)}), 500



if __name__ == "__main__":
    app.run(debug=True, port=5001)
