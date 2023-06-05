from sqlalchemy import Column, ForeignKey, Integer, String, DateTime
from sqlalchemy.orm import relationship
from .database import Base
import uuid


class User(Base):
    __tablename__ = "users"

    id = Column(String(36), primary_key=True, index=True, default=str(uuid.uuid4()))
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    full_name = Column(String(25))

    event = relationship("Event", back_populates="user")


class Event(Base):
    __tablename__ = "events"

    id = Column(String(36), primary_key=True, index=True, default=str(uuid.uuid4()))
    title = Column(String(50))
    price = Column(Integer, default=0)
    short_description = Column(String(125))
    long_description = Column(String(800), nullable=True)
    image = Column(String)
    startDate = Column(DateTime)
    endDate = Column(DateTime)
    created_at = Column(DateTime)
    location = Column(String)
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
    full_name = Column(String(255))
    email = Column(String(255))
    phone_number = Column(String)
    created_at = Column(DateTime)
    status = Column(String, default="pending")
    ticket_amount = Column(Integer)
    total_price = Column(Integer)

    event_id = Column(String(36), ForeignKey("events.id"))
    event = relationship("Event", back_populates="orders")
