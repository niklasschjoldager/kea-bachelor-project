from typing import Union
from pydantic import BaseModel, Field
from datetime import datetime


class UserBase(BaseModel):
    email: str
    full_name: str = Field(..., max_length=30)


class UserCreate(UserBase):
    password: str = Field(..., min_length=10)


class User(UserBase):
    id: int

    class Config:
        orm_mode = True


class Token(BaseModel):
    access_token: str
    token_type: str


class LoginData(BaseModel):
    id: int
    access_token: str
    name: str
    email: str


class TokenData(BaseModel):
    username: Union[str, None] = None
    scopes: list[str] = []


class EventBase(BaseModel):
    title: str
    price: Union[int, None] = (0,)
    short_description: str
    image: str
    long_description: Union[str, None] = None
    startDate: datetime
    endDate: Union[datetime, None] = None
    created_at: datetime = datetime.now()
    location: str
    ticket_quantity: Union[int, None] = None


class EventCreate(EventBase):
    pass


class Event(EventBase):
    id: int

    class Config:
        orm_mode = True


class OrderBase(BaseModel):
    email: str
    full_name: str = Field(..., max_length=30)
    phone_number: int
    created_at: datetime


class OrderCreate(OrderBase):
    ticket_amount: int


class Order(OrderBase):
    id: int
    status: str
    total_price: int

    class Config:
        orm_mode = True
