from fastapi import APIRouter, HTTPException
from fastapi import Depends
from sqlalchemy.orm import Session
from app import crud
from app.schemas import User, EventCreate
from app.dependencies import get_db
from app.auth import get_current_user
from typing import Annotated

router = APIRouter(tags=["events"])


@router.get("/users/{user_id}/events")
def get_events(user_id, db: Session = Depends(get_db)):
    events = crud.get_events(db, user_id)

    if events is None:
        raise HTTPException(status_code=404, detail="No events for this user")

    return events


@router.get("/users/{user_id}/events/{event_id}")
def get_event(user_id, event_id, db: Session = Depends(get_db)):
    events = crud.get_event(db, user_id, event_id)

    if events is None:
        raise HTTPException(status_code=404, detail="No events for this user")

    return events


@router.post("/events")
def create_event(
    current_user: Annotated[User, Depends(get_current_user)],
    event: EventCreate,
    db: Session = Depends(get_db),
):
    return crud.create_event(db=db, event=event, user_id=current_user.id)


@router.delete("/events/{event_id}")
def delete_event(
    event_id,
    current_user: Annotated[User, Depends(get_current_user)],
    db: Session = Depends(get_db),
):
    return crud.delete_event(db, user_id=current_user.id, event_id=event_id)
