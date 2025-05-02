import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

load_dotenv()

dbname=os.getenv("DB_NAME")
user=os.getenv("DB_USER")
password=os.getenv("DB_PASS")
host=os.getenv("DB_HOST")
port=os.getenv("DB_PORT")

SQLALCHEMY_DATABASE_URL = f"postgresql://postgres:{password}@{host}/{dbname}"

engine = create_engine(SQLALCHEMY_DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()