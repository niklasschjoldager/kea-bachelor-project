from fastapi import APIRouter
from fastapi import Depends
from sqlalchemy.orm import Session
from app import crud
from app.schemas import Event
from app.dependencies import get_db

router = APIRouter(tags=["events"])


@router.get("/events")
def get_events(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    events = crud.get_events(db, skip=skip, limit=limit)
    return events


@router.post("/events")
def create_event():
    return{"I'm an event!"}
