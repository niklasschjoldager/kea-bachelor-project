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
      <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] max-w-[800px] w-full translate-x-[-50%] translate-y-[-50%] rounded-sm overflow-x-scroll focus:outline-none z-[200]">
        <Card>
          <div>{children}</div>
          <Dialog.Close
            asChild
            className="absolute cursor-pointer top-6 right-6"
          >
            <svg
              width="14"
              height="14"
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
          </Dialog.Close>
        </Card>
      </Dialog.Content>
    </Dialog.Portal>
  );
};

export default Modal;
