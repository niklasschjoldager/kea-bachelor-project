from fastapi import APIRouter, HTTPException
from fastapi import Depends
from sqlalchemy.orm import Session
from app import crud
from app.schemas import OrderCreate, User
from app.dependencies import get_db
from app.auth import get_current_user
from typing import Annotated

router = APIRouter(tags=["orders"])


@router.post("/events/{event_id}/orders")
def create_order(event_id, order: OrderCreate, db: Session = Depends(get_db)):
    return crud.create_order(db=db, order=order, event_id=event_id)


@router.get("/events/{event_id}/orders")
def get_orders(
    current_user: Annotated[User, Depends(get_current_user)],
    event_id,
    db: Session = Depends(get_db),
):
    event = crud.get_event(db=db, user_id=current_user.id, event_id=event_id)

    if event is None:
        raise HTTPException(status_code=404, detail="Event not found")

    orders = crud.get_orders(db=db, event_id=event_id, user_id=current_user.id)

    if orders is None:
        raise HTTPException(status_code=404, detail="No orders for this event")

    return orders


@router.get("/events/{event_id}/orders/{order_id}")
def get_order(
    current_user: Annotated[User, Depends(get_current_user)],
    order_id,
    event_id,
    db: Session = Depends(get_db),
):
    order = crud.get_order(
        db=db, order_id=order_id, event_id=event_id, user_id=current_user.id
    )

    if order is None:
        raise HTTPException(status_code=404, detail="No such order")

    return order
