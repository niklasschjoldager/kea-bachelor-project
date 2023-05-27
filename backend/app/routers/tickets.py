from fastapi import APIRouter
from fastapi import Depends
from sqlalchemy.orm import Session
from app import crud
from app.schemas import TicketCreate
from app.dependencies import get_db

router = APIRouter(tags=["tickets"])

@router.post("/orders/{order_id}/tickets")
def create_ticket(order_id, ticket: TicketCreate, db: Session = Depends(get_db)):
    return crud.create_ticket(db=db, ticket=ticket, order_id=order_id)


@router.get("/orders/{order_id}/tickets")
def get_tickets(order_id, db: Session = Depends(get_db)):
    tickets = crud.get_tickets(db, order_id)

    if tickets is None:
        raise HTTPException(status_code=404, detail="No tickets for this order")
    
    return tickets


@router.get("/orders/{order_id}/tickets/{ticket_id}")
def get_ticket(order_id, ticket_id, db: Session = Depends(get_db)):
    ticket = crud.get_ticket(db, order_id, ticket_id)

    if ticket is None:
        raise HTTPException(status_code=404, detail="No such ticket")
    
    return ticket