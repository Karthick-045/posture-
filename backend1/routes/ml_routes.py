from flask import Blueprint
from flask import jsonify
from flask import request

from services.ml_service import predict_posture

ml_bp = Blueprint(
    "ml",
    __name__
)


@ml_bp.route("/api/ml/test")
def test():

    result = predict_posture(
        170,
        0.03,
        15
    )

    return jsonify({
        "prediction": result
    })


@ml_bp.route(
    "/api/ml/predict",
    methods=["POST"]
)
def predict():

    data = request.get_json()

    result = predict_posture(
        float(data["neck_angle"]),
        float(data["shoulder_drop"]),
        float(data["score"])
    )

    return jsonify({
        "prediction": result
    })