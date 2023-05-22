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
    access_token: str
    name: str
    email: str


class TokenData(BaseModel):
    username: str | None = None
    scopes: list[str] = []


class SiteBase(BaseModel):
    name: str
    url: str


class Site (SiteBase):
    id: int

    class Config:
        orm_mode = True


class SiteCreate(SiteBase):
    pass


class EventBase(BaseModel):
    title: str
    price: int
    short_description: str
    long_description: str
    image: str
    startDate: datetime
    endDate: datetime
    created_at: datetime
    location: str
    ticket_quantity: int


class EventCreate(EventBase):
    pass


class Event(EventBase):
    id: int

    class Config:
        orm_mode = True