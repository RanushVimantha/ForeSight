import joblib
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.metrics import classification_report, confusion_matrix
from sklearn.model_selection import train_test_split
import os

# Create output folder if it doesn't exist
os.makedirs("outputs", exist_ok=True)

# Load model and features
model = joblib.load("models/risk_model.pkl")
feature_columns = joblib.load("models/feature_columns.pkl")

# Load dataset
df = pd.read_csv("data/sri_lanka_it_project_data_v2.csv")
X = df[feature_columns]
y = df["risk_level"]

# Split for evaluation
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Predict
y_pred = model.predict(X_test)

# Save classification report
report = classification_report(y_test, y_pred, output_dict=False)
with open("outputs/classification_report.txt", "w") as f:
    f.write("Classification Report:\n\n")
    f.write(report)
print("✅ outputs/classification_report.txt saved")

# Save confusion matrix
cm = confusion_matrix(y_test, y_pred, labels=model.classes_)
plt.figure(figsize=(6, 5))
sns.heatmap(cm, annot=True, fmt="d", cmap="Blues", xticklabels=model.classes_, yticklabels=model.classes_)
plt.title("Confusion Matrix")
plt.xlabel("Predicted")
plt.ylabel("Actual")
plt.tight_layout()
plt.savefig("outputs/confusion_matrix.png")
print("✅ outputs/confusion_matrix.png saved")

# Feature importance (RandomForest only)
try:
    classifier = model.named_steps["classifier"]
    importances = classifier.feature_importances_
    encoder = model.named_steps["preprocessor"]
    feature_names = encoder.get_feature_names_out()

    fi_df = pd.DataFrame({"Feature": feature_names, "Importance": importances})
    fi_df = fi_df.sort_values("Importance", ascending=False)

    plt.figure(figsize=(10, 6))
    sns.barplot(x="Importance", y="Feature", data=fi_df.head(15))
    plt.title("Top 15 Feature Importances")
    plt.tight_layout()
    plt.savefig("outputs/feature_importance.png")
    print("✅ outputs/feature_importance.png saved")
except Exception as e:
    print("⚠️ Could not generate feature importance chart:", str(e))
