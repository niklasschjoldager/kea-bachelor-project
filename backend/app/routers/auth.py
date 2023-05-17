from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from typing import Annotated

from app import crud
from app.schemas import UserCreate, User, Token
from app.dependencies import get_db
from app.auth import authenticate_user, ACCESS_TOKEN_EXPIRE_MINUTES

router = APIRouter(tags=["authentication"])


@router.post("/signup", response_model=User)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, user.email)

    if db_user is not None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User with email already exists",
        )

    return crud.create_user(db, user)


@router.post("/token", response_model=User)
def login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    db: Session = Depends(get_db),
):
    user = authenticate_user(form_data.username, form_data.password, db)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    # access_token = create_access_token(
    #     data={"sub": user.email}, expires_delta=access_token_expires
    # )

    print(user)

    # return {"access_token": access_token, "token_type": "bearer"}
    return user
    # return access_token
