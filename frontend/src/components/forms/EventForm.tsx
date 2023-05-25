"use client";
import React, { useState, FormEvent, ChangeEvent } from "react";
import Form from "@/components/common/FormBase";
import Input from "@/components/ui/Input";

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

    const [data, setData] = useState({})

    const updateData = (event: ChangeEvent<HTMLInputElement>) => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        })
    }
    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        console.log(data)
    }

    const handleSelectChange = (value: string) => {
        const selectedOption = paymentOptions.find(option => option.value === value);
        if (selectedOption) {
            updateData({
                target: {
                    name: "event-type",
                    value: selectedOption.value
                }
            } as ChangeEvent<HTMLInputElement>);
        }
    };

    return (
        <Form formAction={submit} submitText="Create event">
            <Input type="text" labelText="Title" inputId="event-title" required={true} getData={updateData} />
            <Input type="text" labelText="Short description" inputId="event-short-desc" required={false} getData={updateData} />
            <Input type="longDesc" labelText="Long description" inputId="event-long-desc" required={true} getData={updateData} />
            <Input type="text" labelText="Location" inputId="event-location" required={true} getData={updateData} />
            <div className="flex gap-5 flex-col md:flex-row">
                <Input type="time" labelText="Event start date" inputId="event-start-date" required={true} getData={updateData} />
                <Input type="time" labelText="Event end date" inputId="event-end-date" required={false} getData={updateData} />
            </div>
            <Input type="file" labelText="Image" inputId="event-image" required={false} getData={updateData} />
            <Input type="select" labelText="Type of payment and registration" inputId="event-type" options={paymentOptions} changePayment={changePayment} required={true} getData={handleSelectChange} />
            {ifPayment == "payment" && (
                <>
                    <Input type="number" labelText="Total amount of tickets" inputId="event-ticket-amount" required={true} getData={updateData} />
                    <Input type="number" labelText="Price per ticket" inputId="event-ticket-price" required={true} getData={updateData} />
                </>
            )}
            {ifPayment == "signup" && (
                <Input type="number" labelText="Total amount of tickets" inputId="event-ticket-amount" required={true} getData={updateData} />
            )}
        </Form>
    )
}
export default EventForm;
