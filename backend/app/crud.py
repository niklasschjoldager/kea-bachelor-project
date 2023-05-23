from sqlalchemy.orm import Session

from app import models, schemas
from app.auth import get_password_hash


def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()


def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()


def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()


def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = get_password_hash(user.password)

    db_user = models.User(
        email=user.email, full_name=user.full_name, hashed_password=hashed_password
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return db_user


def get_sites_by_user(db: Session, user_id: int):
    sites = db.query(models.Site).filter(models.Site.owner_id == user_id).all()
    return sites


def create_user_site(db: Session, site: schemas.SiteCreate, user_id: int):
    db_site = models.Site(**site.dict(), owner_id=user_id)
    db.add(db_site)
    db.commit()
    db.refresh(db_site)
    return db_site

def create_event(db: Session, event: schemas.EventCreate, site_id: int):
    db_event = models.Event(**event.dict(), site_id=site_id)
    db.add(db_event)
    db.commit()
    db.refresh(db_event)
    return db_event

def get_events(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Event).offset(skip).limit(limit).all()