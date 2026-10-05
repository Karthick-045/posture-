from flask import Flask
from flask_cors import CORS

from routes.posture_routes import posture_bp
from routes.analytics_routes import analytics_bp
from routes.report_routes import report_bp
from routes.ml_routes import ml_bp

app = Flask(__name__)

CORS(app)

app.register_blueprint(posture_bp)
app.register_blueprint(analytics_bp)
app.register_blueprint(report_bp)
app.register_blueprint(ml_bp)

@app.route("/")
def home():

    return {

        "status": "running",
        "project": "PostureQuest AI",
        "version": "1.0"

    }


@app.route("/health")
def health():

    return {

        "status": "healthy"

    }


if __name__ == "__main__":

    app.run(
        debug=True,
        host="0.0.0.0",
        port=5000
    )