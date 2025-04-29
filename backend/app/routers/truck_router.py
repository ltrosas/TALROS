from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from .. import models, database, schemas
from fastapi import Path, HTTPException

router = APIRouter(
    prefix="/truck",
    tags=["Truck"]
)

@router.post("/")
def create_truck(truck: schemas.TruckCreate, db: Session = Depends(database.get_db)):
    truck_model = models.Truck(
        registration=truck.registration,
        make=truck.make,
        model=truck.model,
        year=truck.year,
        weight=truck.weight
    )
    db.add(truck_model)
    db.commit()
    db.refresh(truck_model)
    return truck_model

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

@router.delete("/{id}")
def delete_truck(id: int, db: Session = Depends(database.get_db)):
    truck = db.query(models.Truck).filter(models.Truck.id == id).first()

    if not truck:
        raise HTTPException(status_code=404, detail="Truck not found.")

    db.delete(truck)
    db.commit()
    return {"detail": "Truck deleted successfully."}