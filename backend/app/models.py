from sqlalchemy import Column, ForeignKey, Integer, String, DateTime
from sqlalchemy.orm import relationship
from .database import Base
import uuid


class User(Base):
    __tablename__ = "users"

    id = Column(
        String(36),
        primary_key=True,
        index=True,
        default=str(uuid.uuid4()),
        autoincrement=False,
    )
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    full_name = Column(String(100))

    event = relationship("Event", back_populates="user")


class Event(Base):
    __tablename__ = "events"

    id = Column(
        String(36),
        primary_key=True,
        index=True,
        default=str(uuid.uuid4()),
        autoincrement=False,
    )
    title = Column(String(100))
    price = Column(Integer, default=0)
    short_description = Column(String(150))
    long_description = Column(String(), nullable=True)
    image = Column(String)
    startDate = Column(String)
    endDate = Column(String)
    created_at = Column(String)
    location = Column(String(100))
    ticket_quantity = Column(Integer, nullable=True, default=None)
    available_tickets = Column(Integer, nullable=True, default=None)

    user_id = Column(String(36), ForeignKey("users.id"))
    user = relationship("User", back_populates="event")

    orders = relationship("Order", back_populates="event")


class Order(Base):
    __tablename__ = "orders"

    id = Column(
        String(36),
        primary_key=True,
        index=True,
        default=str(uuid.uuid4()),
        autoincrement=False,
    )
    full_name = Column(String(100))
    email = Column(String)
    phone_number = Column(Integer)
    created_at = Column(String)
    status = Column(String, default="pending")
    ticket_amount = Column(Integer)
    total_price = Column(Integer)

    event_id = Column(String(36), ForeignKey("events.id"))
    event = relationship("Event", back_populates="orders")
