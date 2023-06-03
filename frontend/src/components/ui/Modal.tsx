"use client";
import React, { ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import Close from "@/icons/close.svg";
import Card from "@/components/ui/Card";
import Image from "next/image";

type Props = {
  title: string;
  buttonText: string;
  button?: JSX.Element;
  children: ReactNode;
};

const Modal = ({ title, buttonText, button, children }: Props) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        {button ? (
          button
        ) : (
          <button className="rounded-sm bg-dark-gray px-3 py-2 text-button text-white">
            {buttonText}
          </button>
        )}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="pointer-events-none fixed inset-0 bg-dark-gray opacity-50" />
        <Dialog.Content className="rounded-sm fixed left-[50%] top-[50%] max-h-[85vh] w-full max-w-modal translate-x-[-50%] translate-y-[-50%] overflow-x-scroll focus:outline-none data-[state=open]:animate-contentShow">
          <Card>
            <h1 className="text-h1 text-dark-gray">{title}</h1>
            <div>{children}</div>
            <Dialog.Close
              asChild
              className="absolute right-6 top-6 cursor-pointer"
            >
              <Image priority src={Close} alt="Close" />
            </Dialog.Close>
          </Card>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;
