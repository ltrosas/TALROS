from fastapi import FastAPI
from .routers import truck_router, loads_router, trip_router
from . import models, database

# Create all tables
models.Base.metadata.create_all(bind=database.engine)

# Create FastAPI app
app = FastAPI()

# Include routers
app.include_router(truck_router.router)
app.include_router(loads_router.router)
app.include_router(trip_router.router)