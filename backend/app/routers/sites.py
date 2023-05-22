from http.client import HTTPException
from fastapi import APIRouter
from fastapi import Depends
from sqlalchemy.orm import Session
from app import crud
from app.schemas import SiteCreate, Site
from app.dependencies import get_db

router = APIRouter(tags=["sites"])

# @router.get("/sites", response_model=Site)
# def get_sites(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
#     sites = crud.get_sites(db, skip=skip, limit=limit)
#     return sites

@router.get("/users/{user_id}/sites", response_model=Site)
def get_sites_by_user(user_id: int, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    sites = crud.get_sites_by_user(db, user_id=user_id, skip=skip, limit=limit)
    if sites is None:
        raise HTTPException(status_code=404, detail="No sites for this user")
    return sites

@router.post("/users/{user_id}/sites")
def create_site_for_user(
    user_id: int, site: SiteCreate, db: Session = Depends(get_db)
):
    return crud.create_user_site(db=db, site=site, user_id=user_id)
