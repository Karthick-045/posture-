from flask import Blueprint, jsonify

from services.analytics_service import (
    get_summary,
    get_posture_iq,
    get_weekly_stats,
    get_dashboard
)

analytics_bp = Blueprint(
    "analytics",
    __name__
)

@analytics_bp.route(
    "/api/analytics/summary",
    methods=["GET"]
)
def analytics_summary():

    return jsonify(
        get_summary()
    )


@analytics_bp.route(
    "/api/analytics/posture-iq",
    methods=["GET"]
)
def posture_iq():

    return jsonify(
        get_posture_iq()
    )


@analytics_bp.route(
    "/api/analytics/weekly",
    methods=["GET"]
)
def weekly():

    return jsonify(
        get_weekly_stats()
    )


@analytics_bp.route(
    "/api/dashboard",
    methods=["GET"]
)
def dashboard():

    return jsonify(
        get_dashboard()
    )