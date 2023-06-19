from typing import Union
from pydantic import BaseModel, Field, EmailStr, PositiveInt
from datetime import datetime


class UserBase(BaseModel):
    email: EmailStr
    full_name: str = Field(..., max_length=100)


class UserCreate(UserBase):
    password: str = Field(..., min_length=10)


class User(UserBase):
    id: str

    class Config:
        orm_mode = True


class Token(BaseModel):
    access_token: str
    token_type: str


class LoginData(BaseModel):
    id: str
    access_token: str
    name: str
    email: str


class TokenData(BaseModel):
    username: Union[str, None] = None
    scopes: list[str] = []


class EventBase(BaseModel):
    title: str = Field(..., max_length=100)
    price: Union[int, None] = (0,)
    short_description: str = Field(..., max_length=150)
    image: str
    long_description: Union[str, None] = None
    startDate: datetime
    endDate: Union[datetime, None] = None
    created_at: datetime = datetime.now()
    location: str = Field(..., max_length=100)
    ticket_quantity: Union[int, None] = None


class EventCreate(EventBase):
    pass


class Event(EventBase):
    id: str
    available_tickets: Union[int, None] = None

    class Config:
        orm_mode = True


class OrderBase(BaseModel):
    email: EmailStr
    full_name: str = Field(..., max_length=100)
    phone_number: int
    created_at: datetime = datetime.now()


class OrderCreate(OrderBase):
    ticket_amount: PositiveInt


class Order(OrderBase):
    id: str
    status: str
    total_price: int

    class Config:
        orm_mode = True
