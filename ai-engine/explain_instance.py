import joblib
import shap
import numpy as np
import pandas as pd
from sklearn.linear_model import SGDClassifier

def load_model_and_features():
    model = joblib.load("models/risk_model.pkl")
    features = joblib.load("models/feature_columns.pkl")
    return model, features

def explain_instance(request_json):
    try:
        # Load model and expected features
        model, feature_columns = load_model_and_features()

        if not isinstance(model, SGDClassifier):
            return {"error": "SHAP currently supports SGDClassifier only."}

        # Convert and validate input
        input_row = {}
        for col in feature_columns:
            value = request_json.get(col, 0)
            try:
                value = float(value) if col not in ["project_type", "client_type", "technology_stack", "agile_practice"] else str(value)
            except:
                value = 0
            input_row[col] = value

        input_df = pd.DataFrame([input_row])
        input_df = input_df.fillna(0)

        explainer = shap.Explainer(model, input_df)
        shap_values = explainer(input_df)

        contributions = dict(zip(input_df.columns, shap_values.values[0]))
        sorted_contributions = sorted(contributions.items(), key=lambda x: abs(x[1]), reverse=True)

        prediction = model.predict(input_df)[0]
        return {
            "prediction": prediction,
            "explanation": sorted_contributions[:10]
        }

    except Exception as e:
        print("❌ SHAP explanation error:", e)
        return {"error": str(e), "explanation": []}
