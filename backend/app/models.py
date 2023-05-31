from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime
from sqlalchemy.orm import relationship
from .database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    full_name = Column(String(25))

    event = relationship("Event", back_populates="user")

    integration = relationship("Integration", back_populates="user")


class Event(Base):
    __tablename__ = "events"

    id = Column(Integer, primary_key=True, index=True)
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

    user_id = Column(Integer, ForeignKey("users.id"))
    user = relationship("User", back_populates="event")

    orders = relationship("Order", back_populates="event")


class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String(255))
    email = Column(String(255))
    phone_number = Column(String)
    created_at = Column(DateTime)
    status = Column(String, default="pending")
    ticket_amount = Column(Integer)
    total_price = Column(Integer)

    event_id = Column(Integer, ForeignKey("events.id"))
    event = relationship("Event", back_populates="orders")


class Integration(Base):
    __tablename__ = "integrations"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey("users.id"))
    user = relationship("User", back_populates="integration")
