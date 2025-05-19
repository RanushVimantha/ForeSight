from flask import request, jsonify
import joblib
import shap
import numpy as np
import pandas as pd
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder
from sklearn.ensemble import RandomForestClassifier

def load_model_and_features():
    model = joblib.load("models/risk_model.pkl")
    features = joblib.load("models/feature_columns.pkl")
    return model, features

def explain_instance(request_json):
    # Load model and features
    model, feature_columns = load_model_and_features()

    # Check classifier type
    classifier = model.named_steps["classifier"]
    if not isinstance(classifier, RandomForestClassifier):
        return {"error": "SHAP currently supports RandomForestClassifier only."}

    # Prepare input
    input_data = [request_json.get(f, 0) for f in feature_columns]
    input_df = pd.DataFrame([request_json])

    # Recreate the encoder for SHAP input
    categorical_features = ["project_type", "client_type", "technology_stack", "agile_practice"]
    encoder = ColumnTransformer(transformers=[
        ("cat", OneHotEncoder(handle_unknown="ignore"), categorical_features)
    ], remainder="passthrough")
    encoder.fit(input_df[feature_columns])
    encoded_input = encoder.transform(input_df[feature_columns])

    # SHAP Explanation
    explainer = shap.TreeExplainer(classifier)
    shap_values = explainer.shap_values(encoded_input)

    # Get class index predicted
    class_index = classifier.predict(encoded_input)[0]
    class_idx = list(classifier.classes_).index(class_index)

    # Get SHAP values for this instance
    feature_names = encoder.get_feature_names_out()
    shap_contrib = shap_values[class_idx][0]  # First row
    feature_contributions = dict(zip(feature_names, shap_contrib))

    # Sort and return top contributions
    sorted_contributions = sorted(feature_contributions.items(), key=lambda x: abs(x[1]), reverse=True)
    return {
        "prediction": class_index,
        "explanation": sorted_contributions[:8]  # Top 8 features
    }
