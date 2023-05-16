from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime
from sqlalchemy.orm import relationship

from .database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    full_name = Column(String(25))

    sites = relationship("Site", back_populates="owner")


class Site(Base):
    __tablename__ = "sites"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    url = Column(String)

    owner_id = Column(Integer, ForeignKey("users.id"))
    owner = relationship("User", back_populates="sites")

    events = relationship("Event", back_populates="site")

    integration = relationship("Integration", back_populates="site")


class Event(Base):
    __tablename__ = "events"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(50))
    price = Column(Integer)
    short_description = Column(String(125))
    long_description = Column(String(800))
    image = Column(String)
    startDate = Column(DateTime)
    endDate = Column(DateTime)
    created_at = Column(DateTime)
    location = Column(String)
    ticket_quantity = Column(Integer)

    site_id = Column(Integer, ForeignKey("sites.id"))
    site = relationship("Site", back_populates="events")

    orders = relationship("Order", back_populates="event")


class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String(255))
    email = Column(String(255))
    phone_number = Column(String)
    created_at = Column(DateTime)
    status = Column(String)

    event_id = Column(Integer, ForeignKey("events.id"))
    event = relationship("Event", back_populates="orders")

    tickets = relationship("Ticket", back_populates="order")


class Ticket(Base):
    __tablename__ = "tickets"

    id = Column(Integer, primary_key=True, index=True)
    price = Column(Integer)

    order_id = Column(Integer, ForeignKey("orders.id"))
    order = relationship("Order", back_populates="tickets")


class Integration(Base):
    __tablename__ = "integrations"

    id = Column(Integer, primary_key=True, index=True)

    site_id = Column(Integer, ForeignKey("sites.id"))
    site = relationship("Site", back_populates="integration")
