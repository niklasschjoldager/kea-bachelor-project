from sqlalchemy.orm import Session
from sqlalchemy import func
from fastapi import HTTPException
from app.schemas import EventCreate

from app import models, schemas
from app.auth import get_password_hash


def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()


def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()


def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()


def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = get_password_hash(user.password)

    db_user = models.User(
        email=user.email, full_name=user.full_name, hashed_password=hashed_password
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return db_user

def create_event(db: Session, event: schemas.EventCreate, user_id: int):
    db_event = models.Event(**event.dict(), user_id=user_id , available_tickets=event.ticket_quantity)
    db.add(db_event)
    db.commit()
    db.refresh(db_event)
    return db_event


def get_events(db: Session, user_id: int):
    events = db.query(models.Event).filter(models.Event.user_id == user_id).all()
    return events


def get_event(db: Session, user_id: int, event_id: int):
    event = (
        db.query(models.Event)
        .filter(models.Event.user_id == user_id)
        .filter(models.Event.id == event_id)
        .first()
    )
    return event


def delete_event(db: Session, user_id: int, event_id: int):
    event = (
        db.query(models.Event)
        .filter(models.Event.user_id == user_id)
        .filter(models.Event.id == event_id)
        .first()
    )
    db.delete(event)
    db.commit()
    return {"ok": True}


def create_order(db: Session, order: schemas.OrderCreate, event_id: int):
    event = db.query(models.Event).filter(models.Event.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")

    # check the ticket availability if there is one on the event
    if event.ticket_quantity is not None:
        sold_tickets = db.query(func.sum(models.Order.ticket_amount)).filter(models.Order.event_id == event_id).scalar()
        remaining_tickets = event.ticket_quantity - (sold_tickets or 0)

        if order.ticket_amount > remaining_tickets:
            raise HTTPException(status_code=400, detail="We are very sorry, there are not enough tickets!")

        # update event.available_tickets with ticket sold_tickets 
        event.available_tickets = event.ticket_quantity - sold_tickets
        db.add(event)
        db.commit()
        db.refresh(event)

    db_order = models.Order(
        **order.dict(), 
        event_id=event_id
        )
    
    # Update total_price on order based on event price
    db_order.total_price = db_order.ticket_amount * event.price

    db.add(db_order)
    db.commit()
    db.refresh(db_order)

    return db_order


def get_orders(db: Session, user_id: int, event_id: int):
    if not user_id:
        raise HTTPException(status_code=405, detail="Method not allowed")
    orders = db.query(models.Order).filter(models.Order.event_id == event_id).all()
    return orders


def get_orders(db: Session, user_id: int, event_id: int):
    if not user_id:
        raise HTTPException(status_code=405, detail="Method not allowed")
    orders = db.query(models.Order).filter(models.Order.event_id == event_id).all()
    return orders


def get_order(db: Session, user_id: int, order_id: int, event_id: int):
    if not user_id:
        raise HTTPException(status_code=405, detail="Method not allowed")
    order = db.query(models.Order).filter(models.Order.event_id == event_id).filter(models.Order.id == order_id).first()
    return order
