import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
import joblib

df = pd.read_csv("Project_Dataset_deelaka_Risk_3_SYNTHETIC.csv")
df.columns = [col.strip().replace(" ", "_") for col in df.columns]

X = df.drop(columns=["Risk", "Project_Scope"])  # Drop target + text
y = df["Risk"]

# Optional: ensure all column names are strings
X.columns = X.columns.astype(str)

X_train, X_test, y_train, y_test = train_test_split(
    X, y, stratify=y, test_size=0.2, random_state=42
)

model = RandomForestClassifier(n_estimators=200, class_weight='balanced', random_state=42)
model.fit(X_train, y_train)

print("Train Accuracy:", model.score(X_train, y_train))
print("Test Accuracy:", model.score(X_test, y_test))

# Save
joblib.dump(model, "risk_model_v3.pkl")
joblib.dump(list(X.columns), "feature_columns_v3.pkl")
pd.Series(model.feature_importances_, index=X.columns).to_csv("feature_importance_v3.csv")

print("✅ Model and artifacts saved.")
