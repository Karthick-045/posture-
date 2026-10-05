import pymysql
from datetime import datetime

def get_db():
    return pymysql.connect(
        host="localhost",
        user="root",
        password="root",
        database="posturequest"
    )

def save_posture(data):

    db = get_db()
    cursor = db.cursor()

    sql = """
    INSERT INTO posture_records
    (
        session_id,
        timestamp,
        neck_angle,
        shoulder_drop,
        posture_status,
        score
    )
    VALUES (%s,%s,%s,%s,%s,%s)
    """

    values = (
        data["sessionId"],
        datetime.now(),
        data["neckAngle"],
        data["shoulderDrop"],
        data["postureStatus"],
        data["score"]
    )

    try:
        cursor.execute(
            sql,
            values
        )

        db.commit()

        return {
            "message":"saved"
        }
    finally:
        cursor.close()
        db.close()