from sqlalchemy.orm import declarative_base
from sqlalchemy import Column,Integer,String,Float,DateTime
from datetime import datetime

Base = declarative_base()

class PostureRecord(Base):

    __tablename__ = "posture_records"

    id = Column(Integer, primary_key=True)

    session_id = Column(String(100))

    timestamp = Column(
        DateTime,
        default=datetime.utcnow
    )

    neck_angle = Column(Float)

    shoulder_drop = Column(Float)

    posture_status = Column(String(20))

    score = Column(Integer)