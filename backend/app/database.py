import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

load_dotenv()

dbname=os.getenv("DB_NAME", "TALROS")
user=os.getenv("DB_USER")
password=os.getenv("DB_PASS")
host=os.getenv("DB_HOST", "localhost")
port=os.getenv("DB_PORT", "5432")

# Connection string (adjust your DB name, user, and password as needed)
SQLALCHEMY_DATABASE_URL = f"postgresql://postgres:{password}@{host}/{dbname}"

# Create database engine
engine = create_engine(SQLALCHEMY_DATABASE_URL)

# Session local class
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for models
Base = declarative_base()

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()