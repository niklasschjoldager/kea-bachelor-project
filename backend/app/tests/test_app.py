import pytest
import os
import datetime
from fastapi.testclient import TestClient
import sqlalchemy as sa
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.database import Base
from app.main import app
from app.dependencies import get_db


SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


@pytest.fixture()
def test_db():
    Base.metadata.create_all(bind=engine)
    yield
    Base.metadata.drop_all(bind=engine)


def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()


app.dependency_overrides[get_db] = override_get_db

client = TestClient(app)


def get_user():
    request = client.post(
        "/signup",
        json={
            "email": "john@doe.com",
            "password": "password1234",
            "full_name": "John Doe",
        },
    )
    response = request.json()

    return response


def create_event():
    return ""


def test_signup(test_db):
    request = client.post(
        "/signup",
        json={
            "email": "john@doe.com",
            "password": "password1234",
            "full_name": "John Doe",
        },
    )

    assert request.status_code == 200
    response = request.json()
    assert response["email"] == "john@doe.com"
    assert response["name"] == "John Doe"
    assert "id" in response
    assert "access_token" in response


def test_login(test_db):
    client.post(
        "/signup",
        json={
            "email": "john@doe.com",
            "password": "password1234",
            "full_name": "John Doe",
        },
    )
    request = client.post(
        "/token", data={"username": "john@doe.com", "password": "password1234"}
    )
    assert request.status_code == 200
    response = request.json()
    assert response["email"] == "john@doe.com"
    assert response["name"] == "John Doe"
    assert "id" in response
    assert "access_token" in response


def test_create_event(test_db):
    user = get_user()
    request = client.post(
        "/events",
        headers={"Authorization": f"Bearer {user['access_token']}"},
        data={
            "title": "Event",
            "price": 10,
            "short_description": "My very short description",
            "long_description": "My very very very very very long description",
            "location": "Sigurdsgade 23, 2300 København",
            "startDate": str(datetime.datetime.now()),
        },
        files={"image": open("images/test_image.png", "rb")},
    )

    assert request.status_code == 200
    response = request.json()
    assert "id" in response
    assert "available_tickets" in response
    assert "created_at" in response
    assert response["title"] == "Event"
    assert response["price"] == 10
    assert response["short_description"] == "My very short description"
    assert (
        response["long_description"] == "My very very very very very long description"
    )
    assert response["location"] == "Sigurdsgade 23, 2300 København"


def test_delete_event(test_db):
    user = get_user()
    event = client.post(
        "/events",
        headers={"Authorization": f"Bearer {user['access_token']}"},
        data={
            "title": "Event",
            "price": 10,
            "short_description": "My very short description",
            "long_description": "My very very very very very long description",
            "location": "Sigurdsgade 23, 2300 København",
            "startDate": str(datetime.datetime.now()),
        },
        files={"image": open("images/test_image.png", "rb")},
    )
    event = event.json()

    request = client.delete(
        f"/events/{event['id']}",
        headers={"Authorization": f"Bearer {user['access_token']}"},
    )

    assert request.status_code == 200


def test_get_events(test_db):
    user = get_user()
    event_1 = client.post(
        "/events",
        headers={"Authorization": f"Bearer {user['access_token']}"},
        data={
            "title": "Event 1",
            "price": 10,
            "short_description": "My very short description",
            "long_description": "My very very very very very long description",
            "location": "Sigurdsgade 23, 2300 København",
            "startDate": str(datetime.datetime.now()),
        },
        files={"image": open("images/test_image.png", "rb")},
    )
    event_2 = client.post(
        "/events",
        headers={"Authorization": f"Bearer {user['access_token']}"},
        data={
            "title": "Event 2",
            "price": 10,
            "short_description": "My very short description",
            "long_description": "My very very very very very long description",
            "location": "Sigurdsgade 23, 2300 København",
            "startDate": str(datetime.datetime.now()),
        },
        files={"image": open("images/test_image.png", "rb")},
    )
    event_1 = event_1.json()
    event_2 = event_2.json()

    request = client.get(f"/users/{user['id']}/events")

    assert request.status_code == 200
    response = request.json()
    assert response[0]["id"] == event_1["id"]
    assert response[1]["id"] == event_2["id"]


def test_get_event(test_db):
    user = get_user()

    no_event = client.get(
        f"/users/{user['id']}/events/1234",
        headers={"Authorization": f"Bearer {user['access_token']}"},
    )
    assert no_event.status_code == 404

    create_event = client.post(
        "/events",
        headers={"Authorization": f"Bearer {user['access_token']}"},
        data={
            "title": "Event 1",
            "price": 10,
            "short_description": "My very short description",
            "long_description": "My very very very very very long description",
            "location": "Sigurdsgade 23, 2300 København",
            "startDate": str(datetime.datetime.now()),
        },
        files={"image": open("images/test_image.png", "rb")},
    )
    create_event = create_event.json()

    get_event = client.get(
        f"/users/{user['id']}/events/{create_event['id']}",
        headers={"Authorization": f"Bearer {user['access_token']}"},
    )

    assert get_event.status_code == 200
    get_event = get_event.json()
    assert get_event["id"] == create_event["id"]


def test_create_order(test_db):
    user = get_user()

    event = client.post(
        "/events",
        headers={"Authorization": f"Bearer {user['access_token']}"},
        data={
            "title": "Event 1",
            "price": 10,
            "short_description": "My very short description",
            "long_description": "My very very very very very long description",
            "location": "Sigurdsgade 23, 2300 København",
            "startDate": str(datetime.datetime.now()),
            "ticket_quantity": 100,
        },
        files={"image": open("images/test_image.png", "rb")},
    )
    event = event.json()

    order_too_many_tickets = client.post(
        f"/events/{event['id']}/orders",
        headers={"Authorization": f"Bearer {user['access_token']}"},
        json={
            "email": "john@doe.com",
            "full_name": "John Doe",
            "phone_number": 88888888,
            "created_at": str(datetime.datetime.now()),
            "ticket_amount": 101,
        },
    )
    assert order_too_many_tickets.status_code == 400

    order_enough_tickets = client.post(
        f"/events/{event['id']}/orders",
        headers={"Authorization": f"Bearer {user['access_token']}"},
        json={
            "email": "john@doe.com",
            "full_name": "John Doe",
            "phone_number": 88888888,
            "created_at": str(datetime.datetime.now()),
            "ticket_amount": 10,
        },
    )
    assert order_enough_tickets.status_code == 200


def test_get_orders(test_db):
    user = get_user()

    event = client.post(
        "/events",
        headers={"Authorization": f"Bearer {user['access_token']}"},
        data={
            "title": "Event 1",
            "price": 10,
            "short_description": "My very short description",
            "long_description": "My very very very very very long description",
            "location": "Sigurdsgade 23, 2300 København",
            "startDate": str(datetime.datetime.now()),
            "ticket_quantity": 100,
        },
        files={"image": open("images/test_image.png", "rb")},
    )
    event = event.json()

    order_1 = client.post(
        f"/events/{event['id']}/orders",
        headers={"Authorization": f"Bearer {user['access_token']}"},
        json={
            "email": "john@doe.com",
            "full_name": "John Doe",
            "phone_number": 88888888,
            "created_at": str(datetime.datetime.now()),
            "ticket_amount": 10,
        },
    )
    order_2 = client.post(
        f"/events/{event['id']}/orders",
        headers={"Authorization": f"Bearer {user['access_token']}"},
        json={
            "email": "john@doe.com",
            "full_name": "John Doe",
            "phone_number": 88888888,
            "created_at": str(datetime.datetime.now()),
            "ticket_amount": 10,
        },
    )
    order_1 = order_1.json()
    order_2 = order_2.json()

    orders = client.get(
        f"/events/{event['id']}/orders",
        headers={"Authorization": f"Bearer {user['access_token']}"},
    )

    assert orders.status_code == 200
    orders = orders.json()
    assert orders[0]["id"] == order_1["id"]
    assert orders[1]["id"] == order_2["id"]


def test_get_order(test_db):
    user = get_user()

    event = client.post(
        "/events",
        headers={"Authorization": f"Bearer {user['access_token']}"},
        data={
            "title": "Event 1",
            "price": 10,
            "short_description": "My very short description",
            "long_description": "My very very very very very long description",
            "location": "Sigurdsgade 23, 2300 København",
            "startDate": str(datetime.datetime.now()),
            "ticket_quantity": 100,
        },
        files={"image": open("images/test_image.png", "rb")},
    )
    event = event.json()

    create_order = client.post(
        f"/events/{event['id']}/orders",
        headers={"Authorization": f"Bearer {user['access_token']}"},
        json={
            "email": "john@doe.com",
            "full_name": "John Doe",
            "phone_number": 88888888,
            "created_at": str(datetime.datetime.now()),
            "ticket_amount": 10,
        },
    )
    create_order = create_order.json()

    get_order_that_should_fail = client.get(
        f"/events/{event['id']}/orders/1234",
        headers={"Authorization": f"Bearer {user['access_token']}"},
    )

    assert get_order_that_should_fail.status_code == 404

    get_order_that_should_succeed = client.get(
        f"/events/{event['id']}/orders/{create_order['id']}",
        headers={"Authorization": f"Bearer {user['access_token']}"},
    )

    assert get_order_that_should_succeed.status_code == 200
    get_order_that_should_succeed = get_order_that_should_succeed.json()
    assert get_order_that_should_succeed["id"] == create_order["id"]
