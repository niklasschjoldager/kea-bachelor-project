import React, { useState, ChangeEvent, FormEvent } from "react";
import Form from "@/components/FormBase";
import Input from "@/components/Input";
import { request } from "../helpers/helpers";
import { useSession } from "next-auth/react";

const SiteForm = () => {
  const [sites, setSites] = useState({});
  const { data: session, status } = useSession();

  const updateData = (event: ChangeEvent<HTMLInputElement>) => {
    setSites({
      ...sites,
      [event.target.name]: event.target.value,
    });
  };
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(sites);
    request({ type: "POST", endpoint: "/sites", body: sites, session: session, status: status })
  };


  return (
    <Form formAction={submit} submitText={"Create site"}>
      <Input
        inputId={"name"}
        labelText={"Title"}
        required={true}
        type={"text"}
        getData={updateData}
      />
      <Input
        inputId={"url"}
        labelText={"Url"}
        required={true}
        type={"text"}
        getData={updateData}
      />
    </Form>
  );
};

export default SiteForm;
