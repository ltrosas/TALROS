from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from .. import models, database, schemas
from fastapi import Path, HTTPException

router = APIRouter(
    prefix="/trip",
    tags=["Trip"]
)

@router.post("/")
def create_trip(trip: schemas.TripCreate, db: Session = Depends(database.get_db)):
    truck = db.query(models.Truck).filter(models.Truck.id == trip.truck_id).first()
    if not truck:
        raise HTTPException(status_code=404, detail="Truck not found.")

    load = db.query(models.Loads).filter(models.Loads.id == trip.loads_id).first()
    if not load:
        raise HTTPException(status_code=404, detail="Load not found.")

    trip_model = models.Trip(
        truck_id=trip.truck_id,
        loads_id=trip.loads_id,
        initial_mileage=trip.initial_mileage,
        final_mileage=trip.final_mileage,
        fuel_used=trip.fuel_used
    )
    db.add(trip_model)
    db.commit()
    db.refresh(trip_model)
    return trip_model

@router.get("/")
def get_trips(db: Session = Depends(database.get_db)):
    trips = db.query(models.Trip).all()
    return trips