import pandas as pd
from sklearn.linear_model import SGDClassifier
from sklearn.preprocessing import LabelEncoder
import joblib
import json
import os

# === STEP 1: Load your training dataset ===
df = pd.read_csv("data/sri_lanka_it_project_data_v2.csv")

# === STEP 2: Encode categorical columns ===
label_columns = ["project_type", "client_type", "technology_stack", "agile_practice"]
for col in label_columns:
    df[col] = LabelEncoder().fit_transform(df[col])

# === STEP 3: Prepare features and label ===
X = df.drop("risk_level", axis=1)
y = df["risk_level"]

# === STEP 4: Encode the target column ===
target_encoder = LabelEncoder()
y_encoded = target_encoder.fit_transform(y)

# Save the class labels (e.g., ['High', 'Low', 'Medium']) for future `.partial_fit()` calls
class_labels = list(target_encoder.classes_)

# === STEP 5: Train online-learning model ===
model = SGDClassifier(loss="log_loss", max_iter=1000, tol=1e-3)
model.partial_fit(X, y_encoded, classes=list(range(len(class_labels))))

# === STEP 6: Save model and metadata ===
os.makedirs("models", exist_ok=True)
joblib.dump(model, "models/risk_model.pkl")

# Save encoder + column order
meta = {
    "target_classes": class_labels,
    "feature_columns": list(X.columns),
    "label_columns": label_columns
}
with open("models/model_meta.json", "w") as f:
    json.dump(meta, f)

print("✅ Model trained and saved as models/risk_model.pkl")
print("🧠 Target classes:", class_labels)
