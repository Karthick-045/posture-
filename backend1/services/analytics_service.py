import pymysql

def get_db():
    return pymysql.connect(
        host="localhost",
        user="root",
        password="root",
        database="posturequest"
    )

def get_summary():

    db = get_db()
    cursor = db.cursor()
    try:
        cursor.execute(
            "SELECT COUNT(*) FROM posture_records"
        )
        total_records = cursor.fetchone()[0]

        cursor.execute(
            """
            SELECT COUNT(*)
            FROM posture_records
            WHERE posture_status='GOOD'
            """
        )
        good_posture = cursor.fetchone()[0]

        cursor.execute(
            """
            SELECT COUNT(*)
            FROM posture_records
            WHERE posture_status='BAD'
            """
        )
        bad_posture = cursor.fetchone()[0]

        cursor.execute(
            """
            SELECT AVG(score)
            FROM posture_records
            """
        )
        avg_score = cursor.fetchone()[0]

        return {
            "totalRecords": total_records,
            "goodPosture": good_posture,
            "badPosture": bad_posture,
            "averageScore": float(avg_score or 0)
        }
    finally:
        cursor.close()
        db.close()


def get_posture_iq():

    db = get_db()
    cursor = db.cursor()
    try:
        cursor.execute(
            "SELECT COUNT(*) FROM posture_records"
        )

        total_records = cursor.fetchone()[0]

        if total_records == 0:
            return {
                "iq": 0,
                "grade": "N/A"
            }

        cursor.execute(
            """
            SELECT COUNT(*)
            FROM posture_records
            WHERE posture_status='GOOD'
            """
        )

        good_posture = cursor.fetchone()[0]

        cursor.execute(
            """
            SELECT AVG(score)
            FROM posture_records
            """
        )

        result = cursor.fetchone()[0]

        avg_score = float(result or 0)

        good_percentage = (
            good_posture / total_records
        ) * 100

        iq = (
            good_percentage * 0.7
            +
            min(avg_score, 100) * 0.3
        )

        if iq >= 90:
            grade = "A+"
        elif iq >= 80:
            grade = "A"
        elif iq >= 70:
            grade = "B"
        elif iq >= 60:
            grade = "C"
        else:
            grade = "D"

        return {
            "iq": round(iq, 2),
            "grade": grade
        }
    finally:
        cursor.close()
        db.close()


def get_weekly_stats():

    db = get_db()
    cursor = db.cursor()
    try:
        cursor.execute("""
            SELECT
                DATE(timestamp),
                COUNT(*),
                AVG(score)
            FROM posture_records
            GROUP BY DATE(timestamp)
            ORDER BY DATE(timestamp) DESC
            LIMIT 7
        """)

        rows = cursor.fetchall()

        data = []

        for row in rows:
            data.append({
                "date": str(row[0]),
                "records": row[1],
                "averageScore": float(row[2] or 0)
            })

        return data
    finally:
        cursor.close()
        db.close()


def get_dashboard():

    return {
        "summary": get_summary(),
        "postureIQ": get_posture_iq(),
        "weekly": get_weekly_stats()
    }