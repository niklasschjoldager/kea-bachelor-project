"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import Form from "@/components/common/FormBase";
import Input from "../ui/Input";

function SignUpForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    signIn("credentials", {
      full_name: fullName,
      username: email,
      password: password,
      isNewUser: true,
    });
  }


  return (
    <Form formAction={handleSubmit} submitText="Sign up">
      <Input
        type="text"
        labelText="Full name"
        inputId="full-name"
        required={true}
        maxLength={30}
        getData={(event) => setFullName(event.target.value)}
      />
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
        extraLabel="(minimum 10 characters)"
        inputId="password"
        required={true}
        minLength={10}
        getData={(event) => setPassword(event.target.value)}
      />
    </Form>
  );
}

export default SignUpForm;
