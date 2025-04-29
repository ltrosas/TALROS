from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from .. import models, database
from fastapi import Path, HTTPException

router = APIRouter(
    prefix="/truck",
    tags=["Truck"]
)

@router.post("/")
def create_truck(registration: str, make: str, model: str, year: int, weight: float, db: Session = Depends(database.get_db)):
    truck = models.Truck(
        registration=registration,
        make=make,
        model=model,
        year=year,
        weight=weight
    )
    db.add(truck)
    db.commit()
    db.refresh(truck)
    return truck

@router.get("/")
def get_trucks(db: Session = Depends(database.get_db)):
    trucks = db.query(models.Truck).all()
    return trucks

@router.get("/{registration}")
def get_truck_by_id(registration: str = Path(..., description="The ID of the truck to retrieve"), db: Session = Depends(database.get_db)):
    truck = db.query(models.Truck).filter(models.Truck.registration == registration).first()

    if not truck:
        raise HTTPException(status_code=404, detail="Truck not found.")

    return truck

@router.get("/search/{query}")
def search_trucks(query: str, db: Session = Depends(database.get_db)):
    trucks = db.query(models.Truck).filter(models.Truck.registration.ilike(f"%{query}%")).all()

    if not trucks:
        raise HTTPException(status_code=404, detail="No trucks found matching the query.")

    return trucks

@router.delete("/{registration}")
def delete_truck(registration: str, db: Session = Depends(database.get_db)):
    truck = db.query(models.Truck).filter(models.Truck.registration == registration).first()

    if not truck:
        raise HTTPException(status_code=404, detail="Truck not found.")

    db.delete(truck)
    db.commit()
    return {"detail": "Truck deleted successfully."}