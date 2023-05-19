"use client";
import React, { ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import Close from "@/icons/close.svg";
import Card from "@/components/Card";
import Image from "next/image";

type Props = {
  title: string;
  buttonText: string;
  children: ReactNode;
};

const Modal = ({ title, buttonText, children }: Props) => {
  return (
    <Dialog.Root modal={true}>
      <Dialog.Trigger asChild>
        <button className="px-3 py-2 text-white bg-dark-gray text-button">
          {buttonText}
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 pointer-events-none bg-dark-gray opacity-15" />
        <Dialog.Content className="fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-5xl translate-x-[-50%] translate-y-[-50%] overflow-x-scroll rounded-2 focus:outline-none data-[state=open]:animate-contentShow">
          <Card>
            <h1 className="text-h1 text-dark-gray">{title}</h1>
            <div>{children}</div>
            <Dialog.Close
              asChild
              className="absolute cursor-pointer right-6 top-6"
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
