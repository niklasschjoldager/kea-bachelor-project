from sqlalchemy.orm import Session

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
    db_event = models.Event(**event.dict(), user_id=user_id)
    db.add(db_event)
    db.commit()
    db.refresh(db_event)
    return db_event


def get_events(db: Session, user_id: int):
    events = db.query(models.Event).filter(models.Event.user_id == user_id).all()
    return events


def get_event(db: Session, user_id: int, event_id: int):
    event = db.query(models.Event).filter(models.Event.user_id == user_id).filter(models.Event.id == event_id).first()
    return event


def create_order(db: Session, order: schemas.OrderCreate, event_id: int):
    db_order = models.Order(**order.dict(), event_id=event_id)
    db.add(db_order)
    db.commit()
    db.refresh(db_order)
    return db_order


def get_orders(db: Session, event_id: int):
    orders = db.query(models.Order).filter(models.Order.event_id == event_id).all()
    return orders


def get_order(db: Session, order_id: int, event_id: int):
    order = db.query(models.Order).filter(models.Order.event_id == event_id).filter(models.Order.id == order_id).first()
    return order


def create_ticket(db: Session, ticket: schemas.TicketCreate, order_id: int):
    db_ticket = models.Ticket(**ticket.dict(), order_id=order_id)
    db.add(db_ticket)
    db.commit()
    db.refresh(db_ticket)
    return db_ticket


def get_tickets(db: Session, order_id: int):
    tickets = db.query(models.Ticket).filter(models.Ticket.order_id == order_id).all()
    return tickets


def get_ticket(db: Session, order_id: int, ticket_id: int):
    ticket = db.query(models.Ticket).filter(models.Ticket.order_id == order_id).filter(models.Ticket.id == ticket_id).first()
    return ticket