import pandas as pd
import pymysql
import os


def export_csv():

    # Database Connection
    db = pymysql.connect(
        host="localhost",
        user="root",
        password="root",
        database="posturequest"
    )

    # Query
    query = """
    SELECT *
    FROM posture_records
    """

    # Load Data
    df = pd.read_sql(
        query,
        db
    )

    # Debug Output
    print("=" * 50)
    print("Rows Found:", len(df))
    print("=" * 50)

    print(df.head())

    print("=" * 50)

    # CSV Path
    output_path = os.path.join(
        "..",
        "ml-model",
        "posture_dataset.csv"
    )

    # Export CSV
    df.to_csv(
        output_path,
        index=False
    )

    print(
        "CSV Saved At:",
        output_path
    )

    return output_path