"use client";
import React from "react";
import * as Form from "@radix-ui/react-form";
import * as Select from "@radix-ui/react-select";
import ArrowDown from "@/icons/arrow-down-paynes.svg";
import Check from "@/icons/checkmark.svg";
import Upload from "@/icons/upload.svg";
import Image from "next/image";

type Props = {
  inputId: string;
  labelText: string;
  options?: { label: string; value: string }[];
  type: "text" | "time" | "file" | "select";
  changePayment?: (value: string) => void;
};

const Input = ({ inputId, labelText, options, type, changePayment }: Props) => {
  let input;

  const setIfPayment = (value: string) => {
    if (changePayment) {
      changePayment(value);
    }
  };

  switch (type) {
    case "text":
      input = (
        <input
          type="text"
          id={inputId}
          name={inputId}
          className="border-[1px] border-input-border px-3 py-2 text-body text-dark-gray focus:outline-dark-gray"
          required
        />
      );
      break;
    case "file":
      input = (
        <input
          type="file"
          accept="image/png, image/jpeg"
          id={inputId}
          className="hidden"
        />
      );
      break;
    case "time":
      input = (
        <input
          type="datetime-local"
          id={inputId}
          name={inputId}
          min="2020-06-07T00:00"
          max="2030-06-14T00:00"
          className="calendar-picker-indicator:dark-gray cursor-pointer border-[1px] border-input-border px-3 py-2 text-body text-dark-gray focus:outline-dark-gray calendar-picker-indicator:cursor-pointer calendar-picker-indicator:bg-[url('/assets/icons/calendar.svg')]"
          required
        />
      );
      break;
    case "select":
      input = (
        <Select.Root
          onValueChange={(value: string) => setIfPayment(value)}
          required
        >
          <Select.Trigger className="group flex cursor-pointer items-center justify-between border-[1px] border-input-border px-3 py-2 text-body text-dark-gray focus:outline-dark-gray">
            <Select.Value placeholder="Select option" />
            <Select.Icon className="group-aria-expanded:rotate-180 ">
              <Image priority src={ArrowDown} alt="Arrow down" />
            </Select.Icon>
          </Select.Trigger>
          <Select.Portal>
            <Select.Content
              align="start"
              // position="popper"
              className="w-full overflow-hidden rounded-2 border-[1px] border-card-border bg-white shadow-card will-change-[opacity,transform] data-[side=bottom]:animate-slideUpAndFade"
            >
              <Select.Viewport>
                <Select.Group className="w-full px-2 py-3">
                  {options?.map((option) => {
                    return (
                      <Select.Item
                        value={option.value}
                        className="flex cursor-pointer items-center justify-between truncate px-2 pb-3 text-dark-gray last:pb-0 hover:outline-none focus:outline-none data-[state=checked]:font-semibold"
                      >
                        <Select.ItemText>{option.label}</Select.ItemText>
                        <Select.ItemIndicator>
                          <Image
                            priority
                            src={Check}
                            alt="Check"
                            width={13}
                            height={13}
                          />
                        </Select.ItemIndicator>
                      </Select.Item>
                    );
                  })}
                </Select.Group>
              </Select.Viewport>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      );
      break;
  }

  return (
    <Form.Field className="flex flex-col w-full gap-1 text-label text-dark-gray">
      <Form.Label htmlFor={inputId}>{labelText}</Form.Label>
      <Form.Message className="text-label text-[red]" match="valueMissing">
        Please enter a {labelText}
      </Form.Message>
      <Form.Message className="text-label text-[red]" match="typeMismatch">
        Please provide a valid {labelText}
      </Form.Message>
      {type == "file" && (
        <Form.Label htmlFor={inputId} className="cursor-pointer image-input">
          <div className="flex flex-col items-center p-5">
            <Image priority src={Upload} alt="Upload" />
            <p className="text-body text-slate-gray">
              Drag and drop or click to upload file
            </p>
          </div>
        </Form.Label>
      )}
      <Form.Control asChild>{input}</Form.Control>
    </Form.Field>
  );
};

export default Input;
