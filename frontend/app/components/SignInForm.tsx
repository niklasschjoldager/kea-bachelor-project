"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";

function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    signIn("credentials", {
      username: email,
      password: password,
    });
  }

  return (
    <form className="grid gap-2" onSubmit={handleSubmit}>
      <label className="grid" htmlFor="email">
        <span>Email</span>
        <input
          className="bg-paynes-gray text-ghost-white"
          id="email"
          type="email"
          name="username"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </label>
      <label className="grid" htmlFor="password">
        <span>Password</span>
        <input
          className=" bg-paynes-gray text-ghost-white"
          id="password"
          type="password"
          name="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </label>
      <button className="px-4 py-2 text-white bg-dark-gray">Log in</button>
    </form>
  );
}

export default SignInForm;
