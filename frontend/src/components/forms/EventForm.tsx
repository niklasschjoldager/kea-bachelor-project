"use client";
import React, { useState, FormEvent, ChangeEvent } from "react";
import Form from "@/components/common/FormBase";
import Input from "@/components/ui/Input";
import { request } from "../../helpers/helpers";
import { useSession } from "next-auth/react";

const EventForm = () => {
  const paymentOptions = [
    { label: "No signup or payment", value: "noSignup" },
    { label: "Only signup", value: "signup" },
    { label: "Signup and payment", value: "payment" },
  ];

  const [ifPayment, setIfPayment] = useState("");

  const changePayment = (paymentType: string) => {
    setIfPayment(paymentType);
  };

  const [data, setData] = useState({});
  const [statusMessage, setStatusMessage] = useState("")

  const updateData = (event: ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });

    if (event?.target?.files) {
      setData({
        ...data,
        image: event.target.files[0],
      });
    }
  };

  const { data: session, status } = useSession();

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let formData = new FormData();
    for (var key in data) {
      formData.append(key, data[key as keyof typeof data]);
    }

    const response = await request({
      type: "POST",
      endpoint: "/events",
      body: formData,
      session: session,
      status: status,
    });

    if (response?.response.ok) {
      location.reload();
    } else {
      setStatusMessage("Something went wrong. Try again later")
    }
  };

  const handleSelectChange = (value: string) => {
    const selectedOption = paymentOptions.find(
      (option) => option.value === value
    );
    if (selectedOption) {
      updateData({
        target: {
          name: "event-type",
          value: selectedOption.value,
        },
      } as ChangeEvent<HTMLInputElement>);
    }
  };

  return (
    statusMessage ? (
      <div className="px-6 py-12">
        <p className="text-center text-body text-dark-gray">{statusMessage}</p>
      </div>
    ) : (
      <Form formAction={submit} submitText="Create event">
        <Input
          type="text"
          labelText="Title"
          inputId="title"
          required={true}
          getData={updateData}
          maxLength={100}
        />
        <Input
          type="text"
          labelText="Short description"
          inputId="short_description"
          required={true}
          getData={updateData}
          maxLength={150}
        />
        <Input
          type="longDesc"
          labelText="Long description"
          inputId="long_description"
          required={false}
          getData={updateData}
        />
        <Input
          type="text"
          labelText="Location"
          inputId="location"
          required={true}
          getData={updateData}
          maxLength={100}
        />
        <div className="flex flex-col gap-5 md:flex-row">
          <Input
            type="datetime-local"
            labelText="Event start date"
            extraLabel="(dd/mm/yyyy, hh.mm)"
            inputId="startDate"
            required={true}
            getData={updateData}
          />
          <Input
            type="datetime-local"
            labelText="Event end date"
            extraLabel="(dd/mm/yyyy, hh.mm)"
            inputId="endDate"
            required={false}
            getData={updateData}
          />
        </div>
        <Input
          type="file"
          labelText="Image"
          inputId="image"
          required={true}
          getData={updateData}
        />
        <Input
          type="select"
          labelText="Type of payment and registration"
          inputId="event-type"
          options={paymentOptions}
          changePayment={changePayment}
          required={true}
          getData={handleSelectChange}
        />
        {ifPayment == "payment" && (
          <>
            <Input
              type="number"
              labelText="Total amount of tickets"
              inputId="ticket_quantity"
              required={true}
              getData={updateData}
            />
            <Input
              type="number"
              labelText="Price per ticket"
              inputId="price"
              required={true}
              getData={updateData}
            />
          </>
        )}
        {ifPayment == "signup" && (
          <Input
            type="number"
            labelText="Total amount of tickets"
            inputId="ticket_quantity"
            required={true}
            getData={updateData}
          />
        )}
      </Form>
    )

  );
};
export default EventForm;
