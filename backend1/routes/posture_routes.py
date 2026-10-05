from flask import (
    Blueprint,
    request,
    jsonify
)

from services.posture_service import (
    save_posture
)

posture_bp = Blueprint(
    "posture",
    __name__
)

@posture_bp.route(
    "/api/posture/save",
    methods=["POST"]
)
def save_posture_route():

    data = request.json

    result = save_posture(
        data
    )

    return jsonify(
        result
    )