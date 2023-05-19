"use client";
import React, { useState } from "react";
import Form from "@/components/FormBase";
import Input from "@/components/Input";

const EventForm = () => {
    const paymentOptions = [
        { label: 'No signup or payment', value: 'noSignup' },
        { label: 'Only signup', value: 'signup' },
        { label: 'Signup and payment', value: 'payment' },
    ]

    const [ifPayment, setIfPayment] = useState("");

    const changePayment = (paymentType: string) => {
        setIfPayment(paymentType);
    };

    return (
        <Form formAction="" submitText="Create event">
            <Input type="text" labelText="Title" inputId="event-title" required={true} />
            <Input type="text" labelText="Short description" inputId="event-short-desc" required={false} />
            <Input type="longDesc" labelText="Long description" inputId="event-long-desc" required={true} />
            <div className="flex gap-5 flex-col md:flex-row">
                <Input type="time" labelText="Event start date" inputId="event-start-date" required={true} />
                <Input type="time" labelText="Event end date" inputId="event-end-date" required={false} />
            </div>
            <Input type="file" labelText="Image" inputId="event-image" required={false} />
            <Input type="select" labelText="Type of payment and registration" inputId="event-type" options={paymentOptions} changePayment={changePayment} required={true} />
            {ifPayment == "payment" && (
                <>
                    <Input type="number" labelText="Total amount of tickets" inputId="event-ticket-amount" required={true} />
                    <Input type="number" labelText="Price per ticket" inputId="event-ticket-price" required={true} />
                </>
            )}
            {ifPayment == "signup" && (
                <Input type="number" labelText="Total amount of tickets" inputId="event-ticket-amount" required={true} />
            )}
        </Form>
    )
}
export default EventForm;
