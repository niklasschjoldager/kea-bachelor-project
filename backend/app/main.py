from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
from . import models
from .database import engine
from .routers import events, auth, orders

models.Base.metadata.create_all(bind=engine)

app = FastAPI()
app.include_router(auth.router)
app.include_router(events.router)
app.include_router(orders.router)

app.mount("/images", StaticFiles(directory="images"), name="images")

origins = [
    "*",
    "http://localhost:3000",
    "http://localhost:8000",
    "https://kea-bachelor-project.vercel.app/",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/", response_class=RedirectResponse, include_in_schema=False)
async def redirect_to_docs():
    return RedirectResponse(url="/docs")
