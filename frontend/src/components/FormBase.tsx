"use client"
import React, { ReactNode } from "react";
import * as Form from '@radix-ui/react-form';
import Button from './Button';

type Props = {
    formAction: string
    submitText: string
    children: ReactNode
}

const FormBase = ({ formAction, submitText, children }: Props) => {
    return (
        <Form.Root action={formAction} className="flex flex-col gap-5">
            {children}
            <Form.Submit asChild className="w-full flex justify-end">
                <Button buttonText={submitText} />
            </Form.Submit>

        </Form.Root>
    )
}

export default FormBase;