from pydantic import BaseModel

class TruckCreate(BaseModel):
    registration: str
    make: str
    model: str
    year: int
    weight: float

class LoadCreate(BaseModel):
    weight: float
    type: str
    width: float
    height: float
    cost: float

class TripCreate(BaseModel):
    truck_id: int
    loads_id: int
    initial_mileage: int
    final_mileage: int
    fuel_used: float
