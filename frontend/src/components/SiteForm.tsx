import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import Form from "@/components/FormBase";
import Input from "@/components/Input";
import { useSession } from "next-auth/react";

const SiteForm = () => {
  const [data, setData] = useState({});
  const { data: session, status } = useSession();

  const updateData = (event: ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(data);

    try {
      const response = await fetch(`http://127.0.0.1:8000/sites`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user.access_token}`,
        },
        body: JSON.stringify({
          name: "Cool site",
          url: "alleroed-vin.dk",
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch sites");
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error fetching sites:", error);
    }
  };

  return (
    <Form formAction={submit} submitText={"Create site"}>
      <Input
        inputId={"site-title"}
        labelText={"Title"}
        required={true}
        type={"text"}
        getData={updateData}
      />
      <Input
        inputId={"site-url"}
        labelText={"Url"}
        required={true}
        type={"text"}
        getData={updateData}
      />
    </Form>
  );
};

export default SiteForm;
