import pandas as pd
import joblib

from xgboost import XGBClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

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

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

model = XGBClassifier()

model.fit(
    X_train,
    y_train
)

pred = model.predict(X_test)

print(
    "Accuracy:",
    accuracy_score(
        y_test,
        pred
    )
)

joblib.dump(
    model,
    "../saved-model/xgboost_model.pkl"
)

print("XGBoost Model Saved")