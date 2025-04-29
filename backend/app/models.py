from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from .database import Base
from datetime import datetime

class Truck(Base):
    __tablename__ = "truck"

    id = Column(Integer, primary_key=True, index=True)
    registration = Column(String)
    make = Column(String)
    model = Column(String)
    year = Column(Integer)
    weight = Column(Float)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime)

class Loads(Base):
    __tablename__ = "loads"

    id = Column(Integer, primary_key=True, index=True)
    weight = Column(Float)
    type = Column(String)
    width = Column(Float)
    height = Column(Float)
    cost = Column(Float)
    created_at = Column(DateTime, default=datetime.utcnow)

class Trip(Base):
    __tablename__ = "trip"

    id = Column(Integer, primary_key=True, index=True)
    truck_id = Column(Integer, ForeignKey("truck.id"))
    loads_id = Column(Integer, ForeignKey("loads.id"))
    initial_mileage = Column(Integer)
    final_mileage = Column(Integer)
    fuel_used = Column(Float)
    created_at = Column(DateTime, default=datetime.utcnow)