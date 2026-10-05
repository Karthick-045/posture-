import pandas as pd
import joblib

from sklearn.metrics import (
    accuracy_score,
    classification_report,
    confusion_matrix
)

df = pd.read_csv("../posture_dataset.csv")

df["posture_status"] = df["posture_status"].map({
    "GOOD": 1,
    "BAD": 0
})

X = df[
    [
        "neck_angle",
        "shoulder_drop",
        "score"
    ]
]

y = df["posture_status"]

model = joblib.load(
    "../saved-model/posture_model.pkl"
)

pred = model.predict(X)

print("Accuracy:")
print(accuracy_score(y, pred))

print("\nConfusion Matrix:")
print(confusion_matrix(y, pred))

print("\nClassification Report:")
print(classification_report(y, pred))