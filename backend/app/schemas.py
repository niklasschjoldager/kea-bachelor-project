from pydantic import BaseModel, Field


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
