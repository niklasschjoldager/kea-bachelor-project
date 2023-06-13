"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import Form from "@/components/common/FormBase";
import Input from "../ui/Input";

function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    signIn("credentials", {
      username: email,
      password: password,
      isNewUser: false,
    });
  }

  return (
    <Form formAction={handleSubmit} submitText="Sign in">
      <Input
        type="email"
        labelText="E-mail"
        inputId="email"
        required={true}
        getData={(event) => setEmail(event.target.value)}
      />
      <Input
        type="password"
        labelText="Password"
        inputId="password"
        required={true}
        getData={(event) => setPassword(event.target.value)}
      />
    </Form>
  );
}

export default SignInForm;
