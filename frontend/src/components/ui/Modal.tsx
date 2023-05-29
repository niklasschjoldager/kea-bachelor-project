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
          <button className="px-3 py-2 bg-dark-gray text-white text-button rounded-2">
            {buttonText}
          </button>
        )}

      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-dark-gray opacity-[0.15] fixed inset-0 pointer-events-none" />
          <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] max-w-modal w-full translate-x-[-50%] translate-y-[-50%] rounded-2 overflow-x-scroll focus:outline-none">
            <Card>
              <h1 className="text-dark-gray text-h1">{title}</h1>
              <div>
                {children}
              </div>
              <Dialog.Close asChild className="absolute top-6 right-6 cursor-pointer">
                <Image
                  priority
                  src={Close}
                  alt="Close"
                />
              </Dialog.Close>
            </Card>
          </Dialog.Content>
        </Dialog.Portal>
    </Dialog.Root>
  )
};

export default Modal;
