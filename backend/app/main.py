from fastapi import FastAPI
from .routers import truck_router, loads_router, trip_router
from . import models, database
from fastapi.middleware.cors import CORSMiddleware

# Create FastAPI app
app = FastAPI()

# CORS middleware setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow everything for now, later you can lock this down
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(truck_router.router)
app.include_router(loads_router.router)
app.include_router(trip_router.router)