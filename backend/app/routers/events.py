from fastapi import APIRouter
from fastapi import Depends
from sqlalchemy.orm import Session
from app import crud
from app.schemas import Event, User, EventCreate
from app.dependencies import get_db
from app.auth import get_current_user
from typing import Annotated

router = APIRouter(tags=["events"])


@router.get("/events")
def get_events(current_user: Annotated[User, Depends(get_current_user)], db: Session = Depends(get_db)):
    events = crud.get_events(db, user_id=current_user.id)

    if events is None:
        raise HTTPException(status_code=404, detail="No events for this user")
    
    return events


@router.post("/events")
def create_event(current_user: Annotated[User, Depends(get_current_user)], event: EventCreate, db: Session = Depends(get_db)):

    return crud.create_event(db=db, event=event, user_id=current_user.id)
