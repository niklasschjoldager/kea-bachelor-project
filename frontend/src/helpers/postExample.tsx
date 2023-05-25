import React, { useState, ChangeEvent, FormEvent } from "react";
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
};

export default SiteForm;
