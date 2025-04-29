from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from .. import models, database, schemas
from fastapi import Path, HTTPException

router = APIRouter(
    prefix="/loads",
    tags=["Loads"]
)

@router.post("/")
def create_load(load: schemas.LoadCreate, db: Session = Depends(database.get_db)):
    load_model = models.Loads(
        weight=load.weight,
        type=load.type,
        width=load.width,
        height=load.height,
        cost=load.cost
    )
    db.add(load_model)
    db.commit()
    db.refresh(load_model)
    return load_model

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