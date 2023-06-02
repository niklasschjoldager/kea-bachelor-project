"use client";
import React, { ReactNode, FormEvent } from "react";
import * as Form from "@radix-ui/react-form";
import Button from "@/components/ui/Button";

type Props = {
  formAction: (event: FormEvent<HTMLFormElement>) => void;
  submitText: string;
  children: ReactNode;
};

const FormBase = ({ formAction, submitText, children }: Props) => {
  return (
    <Form.Root onSubmit={formAction} className="flex flex-col gap-5">
      {children}
      <Form.Submit asChild className="flex justify-end">
        <div>
          <Button buttonText={submitText} />
        </div>
      </Form.Submit>
    </Form.Root>
  );
};

export default FormBase;
