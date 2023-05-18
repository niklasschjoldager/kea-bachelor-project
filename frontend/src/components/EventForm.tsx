"use client";
import React, { useState } from "react";
import Form from "./FormBase";
import Input from "./Input";

const EventForm = () => {
    const paymentOptions = [
        { label: 'Only signup', value: 'signup' },
        { label: 'Signup and payment', value: 'payment' }
    ]

    const [ifPayment, setIfPayment] = useState("");

    const changePayment = (paymentType: string) => {
        setIfPayment(paymentType);
    }

    return (
        <Form formAction="" submitText="Create event">
            <Input type="text" labelText="Title" inputId="event-title" />
            <Input type="text" labelText="Short description" inputId="event-short-desc" />
            <Input type="text" labelText="Long description" inputId="event-long-desc" />
            <div className="flex gap-5 flex-col md:flex-row">
                <Input type="time" labelText="Event start date" inputId="event-start-date" />
                <Input type="time" labelText="Event end date" inputId="event-end-date" />
            </div>
            <Input type="file" labelText="Image" inputId="event-image" />
            <Input type="text" labelText="Total amount of tickets" inputId="event-ticket-amount" />
            <Input type="select" labelText="Type of payment and registration" inputId="event-type" options={paymentOptions} changePayment={changePayment} />
            {ifPayment == "payment" && (
                <Input type="text" labelText="Price per ticket" inputId="event-ticket-price" />
            )}

        </Form>
    )
}

export default EventForm;