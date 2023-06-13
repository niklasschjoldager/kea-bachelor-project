"use client";
import { ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import Card from "../ui/Card";

type Props = {
  children: ReactNode;
};

const Modal = ({ children }: Props) => {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-dark-gray opacity-50 fixed inset-0 pointer-events-none z-[100]" />
      <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] max-w-[800px] w-full translate-x-[-50%] translate-y-[-50%] rounded-sm focus:outline-none z-[200]">
        <Card>
          <div>{children}</div>
          <Dialog.Close
            asChild
            className="absolute cursor-pointer top-3 right-3 md:top-6 md:right-6"
          >
            <div className="bg-ghost-white rounded-full shadow-switcher p-2 border border-card-border">
              <svg
                width="10"
                height="10"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 13L13 1M1 1L13 13"
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </Dialog.Close>
        </Card>
      </Dialog.Content>
    </Dialog.Portal>
  );
};

export default Modal;
