from flask import (
    Blueprint,
    jsonify
)

from utils.csv_export import (
    export_csv
)

report_bp = Blueprint(
    "report",
    __name__
)


@report_bp.route(
    "/api/report/csv",
    methods=["GET"]
)
def generate_csv():

    file_name = export_csv()

    return jsonify({

        "message":
            "CSV Generated",

        "file":
            file_name

    })