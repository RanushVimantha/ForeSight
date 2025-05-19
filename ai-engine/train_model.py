import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.metrics import classification_report, confusion_matrix, accuracy_score
import joblib
import os

# Load advanced dataset
df = pd.read_csv("data/sri_lanka_it_project_data_v2.csv")

# Separate features and target
X = df.drop("risk_level", axis=1)
y = df["risk_level"]

# Identify categorical and numerical features
categorical_features = ["project_type", "client_type", "technology_stack", "agile_practice"]
numeric_features = [col for col in X.columns if col not in categorical_features and col != "risk_level"]

# Split into train and test
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Preprocessing
preprocessor = ColumnTransformer(transformers=[
    ("cat", OneHotEncoder(handle_unknown="ignore"), categorical_features)
], remainder="passthrough")

# Define candidate models
models = {
    "RandomForest": RandomForestClassifier(random_state=42),
    "LogisticRegression": LogisticRegression(max_iter=1000),
    "GradientBoosting": GradientBoostingClassifier(random_state=42)
}

best_model = None
best_accuracy = 0
best_name = ""

# Train and evaluate each model
for name, model in models.items():
    pipeline = Pipeline(steps=[
        ("preprocessor", preprocessor),
        ("classifier", model)
    ])

    pipeline.fit(X_train, y_train)
    y_pred = pipeline.predict(X_test)
    acc = accuracy_score(y_test, y_pred)

    print(f"\nModel: {name}")
    print("Accuracy:", round(acc, 4))
    print("Classification Report:")
    print(classification_report(y_test, y_pred))
    print("Confusion Matrix:")
    print(confusion_matrix(y_test, y_pred))

    if acc > best_accuracy:
        best_model = pipeline
        best_accuracy = acc
        best_name = name

# Save the best model with standard names
os.makedirs("models", exist_ok=True)
joblib.dump(best_model, "models/risk_model.pkl")
joblib.dump(X.columns.tolist(), "models/feature_columns.pkl")

print(f"\n✅ Final model saved as 'risk_model.pkl' using: {best_name} with accuracy {round(best_accuracy, 4)}")
