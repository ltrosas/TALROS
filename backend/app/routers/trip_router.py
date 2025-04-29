from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from .. import models, database
from fastapi import Path, HTTPException

router = APIRouter(
    prefix="/trip",
    tags=["Trip"]
)

@router.post("/")
def create_trip(truck_id: int, loads_id: int, initial_mileage: int, final_mileage: int, fuel_used: float, db: Session = Depends(database.get_db)):
    truck = db.query(models.Truck).filter(models.Truck.id == truck_id).first()
    if not truck:
        raise HTTPException(status_code=404, detail="Truck not found.")

    load = db.query(models.Loads).filter(models.Loads.id == loads_id).first()
    if not load:
        raise HTTPException(status_code=404, detail="Load not found.")

    trip = models.Trip(
        truck_id=truck_id,
        loads_id=loads_id,
        initial_mileage=initial_mileage,
        final_mileage=final_mileage,
        fuel_used=fuel_used
    )
    db.add(trip)
    db.commit()
    db.refresh(trip)
    return trip

@router.get("/")
def get_trips(db: Session = Depends(database.get_db)):
    trips = db.query(models.Trip).all()
    return trips