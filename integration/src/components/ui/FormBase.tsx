"use client";
import { ReactNode, FormEvent } from "react";
import * as Form from "@radix-ui/react-form";
import Button from "../ui/Button";

type Props = {
  formAction: (event: FormEvent<HTMLFormElement>) => void;
  submitText: string;
  children: ReactNode;
};

const FormBase = ({ formAction, submitText, children }: Props) => {
  return (
    <Form.Root onSubmit={formAction} className="flex flex-col gap-5">
      {children}
      <Form.Submit className="flex justify-end w-full">
        <Button buttonText={submitText} />
      </Form.Submit>
    </Form.Root >
  );
};

export default FormBase;
