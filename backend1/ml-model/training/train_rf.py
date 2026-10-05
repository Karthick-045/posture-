import os
import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

print("Current Folder:")
print(os.getcwd())

csv_path = "../posture_dataset.csv"

print("CSV Path:")
print(csv_path)

print("File Exists:")
print(os.path.exists(csv_path))

print("File Size:")
print(os.path.getsize(csv_path))

df = pd.read_csv(csv_path)

print(df.head())
print(df.shape)

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

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

model = RandomForestClassifier(
    n_estimators=100,
    random_state=42
)

model.fit(X_train, y_train)

pred = model.predict(X_test)

accuracy = accuracy_score(
    y_test,
    pred
)

print("Accuracy:", accuracy)

joblib.dump(
    model,
    "../saved-model/posture_model.pkl"
)

print("Model Saved Successfully")