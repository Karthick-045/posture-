import joblib
import os

MODEL_PATH = os.path.join(
    "ml-model",
    "saved-model",
    "posture_model.pkl"
)

model = joblib.load(MODEL_PATH)


def predict_posture(
    neck_angle,
    shoulder_drop,
    score
):

    prediction = model.predict([
        [
            neck_angle,
            shoulder_drop,
            score
        ]
    ])

    if prediction[0] == 1:
        return "GOOD"

    return "BAD"