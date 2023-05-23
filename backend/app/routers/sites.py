from http.client import HTTPException
from typing import Annotated
from app.auth import get_current_user
from app.models import User
from fastapi import APIRouter
from fastapi import Depends
from sqlalchemy.orm import Session
from app import crud
from app.schemas import SiteCreate, Site
from app.dependencies import get_db

router = APIRouter(tags=["sites"])

@router.get("/sites")
def get_sites_by_user(current_user: Annotated[User, Depends(get_current_user)], db: Session = Depends(get_db)):
    sites = crud.get_sites_by_user(db, user_id=current_user.id)
    if sites is None:
        raise HTTPException(status_code=404, detail="No sites for this user")
    return sites

@router.post("/sites")
def create_site_for_user(
    current_user: Annotated[User, Depends(get_current_user)], site: SiteCreate, db: Session = Depends(get_db)
):
    return crud.create_user_site(db=db, site=site, user_id=current_user.id)
