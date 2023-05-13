from fastapi import APIRouter

router = APIRouter(tags=["events"])


@router.get("/events")
def read_events():
    return {"hello": "world"}
