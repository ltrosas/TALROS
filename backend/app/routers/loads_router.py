from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from .. import models, database
from fastapi import Path, HTTPException

router = APIRouter(
    prefix="/loads",
    tags=["Loads"]
)

@router.post("/")
def create_load(weight: float, type: str, width: float, height: float, cost: float, db: Session = Depends(database.get_db)):
    load = models.Loads(
        weight=weight,
        type=type,
        width=width,
        height=height,
        cost=cost
    )
    db.add(load)
    db.commit()
    db.refresh(load)
    return load

@router.get("/")
def get_loads(db: Session = Depends(database.get_db)):
    loads = db.query(models.Loads).all()
    return loads

@router.delete("/{load_id}")
def delete_load(load_id: int, db: Session = Depends(database.get_db)):
    load = db.query(models.Loads).filter(models.Loads.id == load_id).first()

    if not load:
        raise HTTPException(status_code=404, detail="Load not found.")

    db.delete(load)
    db.commit()
    return {"detail": "Load deleted successfully."}