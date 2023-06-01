from fastapi import APIRouter, HTTPException, File, UploadFile, Form
from fastapi import Depends
from sqlalchemy.orm import Session
from app import crud
from app.schemas import User, EventCreate
from app.dependencies import get_db
from app.auth import get_current_user
from typing import Annotated, Optional
from fastapi.responses import FileResponse
import os
import uuid
import imghdr

router = APIRouter(tags=["events"])
IMAGEDIR = "./images"


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
    title: str = Form(...),
    price: Optional[int] = Form(None),
    short_description: str = Form(...),
    long_description: Optional[str] = Form(None),
    image: UploadFile = File(...),
    startDate: str = Form(...),
    endDate: Optional[str] = Form(None),
    location: str = Form(...),
    ticket_quantity: Optional[int] = Form(None),
    db: Session = Depends(get_db),
):
    try:
        file_name, file_extension = os.path.splitext(image.filename)
        if file_extension.lower() not in (".png", ".jpeg", ".jpg", ".heic"):
            raise HTTPException(status_code=400, detail="Image not allowed")

        image_id = str(uuid.uuid4())
        image_name = f"{image_id}{file_extension}"

        file_location = f"./images/{image_name}"

        with open(file_location, "wb+") as file_object:
            file_object.write(image.file.read())

        file_extension = file_extension.lower()

        if file_extension.lower() == ".jpg":
            file_extension = ".jpeg"  # imghdr tells jpg and jpeg images are "jpeg"

        imghdr_extension = imghdr.what(f"./images/{image_name}")

        print(file_extension)
        print("imghdr: ", imghdr_extension)

        if file_extension != f".{imghdr_extension}":
            print("not allowed")
            raise HTTPException(status_code=400, detail="Image not allowed")

        if endDate == None:
            endDate = startDate

        event = EventCreate(
            title=title,
            price=price,
            short_description=short_description,
            long_description=long_description,
            image=image_name,
            startDate=startDate,
            endDate=endDate,
            location=location,
            ticket_quantity=ticket_quantity,
        )

        createdEvent = crud.create_event(db=db, event=event, user_id=current_user.id)

        if not createdEvent:
            os.remove(f"./images/{image_name}")
            raise HTTPException(status_code=500, detail="Could not create event")

        return createdEvent
    except Exception as exception:
        os.remove(f"./images/{image_name}")
        raise exception


@router.delete("/events/{event_id}")
def delete_event(
    event_id,
    current_user: Annotated[User, Depends(get_current_user)],
    db: Session = Depends(get_db),
):
    return crud.delete_event(db, user_id=current_user.id, event_id=event_id)
