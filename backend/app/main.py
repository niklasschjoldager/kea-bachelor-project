from fastapi import FastAPI
from fastapi.responses import RedirectResponse
from . import models
from .database import engine
from .routers import events, users, auth

models.Base.metadata.create_all(bind=engine)

app = FastAPI()
app.include_router(auth.router)
app.include_router(events.router)
app.include_router(users.router)


@app.get("/", response_class=RedirectResponse, include_in_schema=False)
async def redirect_to_docs():
    return RedirectResponse(url="/docs")
