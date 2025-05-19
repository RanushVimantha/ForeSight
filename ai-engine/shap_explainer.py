import joblib
import shap
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder
from sklearn.ensemble import RandomForestClassifier

# Load model and data
model = joblib.load("models/risk_model.pkl")
columns = joblib.load("models/feature_columns.pkl")
df = pd.read_csv("data/sri_lanka_it_project_data_v2.csv")

X = df[columns]
y = df["risk_level"]

# Extract classifier from pipeline
classifier = model.named_steps["classifier"]

# Check compatibility
if not isinstance(classifier, RandomForestClassifier):
    raise ValueError("❌ SHAP only works with RandomForestClassifier for multiclass models. Retrain with RandomForest to use SHAP.")

# Reapply encoder
categorical_features = ["project_type", "client_type", "technology_stack", "agile_practice"]
encoder = ColumnTransformer(transformers=[
    ("cat", OneHotEncoder(handle_unknown="ignore"), categorical_features)
], remainder="passthrough")

X_encoded = encoder.fit_transform(X)

# SHAP explanation
explainer = shap.TreeExplainer(classifier)
shap_values = explainer.shap_values(X_encoded)

# Plot global summary
shap.summary_plot(shap_values, X_encoded, feature_names=encoder.get_feature_names_out(), show=False)
plt.savefig("shap_summary_plot.png")
print("✅ SHAP plot saved as 'shap_summary_plot.png'")
