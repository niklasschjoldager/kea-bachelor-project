from fastapi import APIRouter
from fastapi import Depends
from sqlalchemy.orm import Session
from app import crud
from app.schemas import OrderCreate
from app.dependencies import get_db

router = APIRouter(tags=["orders"])

@router.post("/events/{event_id}/orders")
def create_order(event_id, order: OrderCreate, db: Session = Depends(get_db)):

    return crud.create_order(db=db, order=order, event_id=event_id)

@router.get("/events/{event_id}/orders")
def get_orders(event_id, db: Session = Depends(get_db)):
    orders = crud.get_orders(db, event_id)

    if orders is None:
        raise HTTPException(status_code=404, detail="No orders for this event")
    
    return orders

@router.get("/events/{event_id}/orders/{order_id}")
def get_order(order_id, event_id, db: Session = Depends(get_db)):
    order = crud.get_order(db, order_id, event_id)

    if order is None:
        raise HTTPException(status_code=404, detail="No such order")
    
    return order