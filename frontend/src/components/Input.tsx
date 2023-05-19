"use client";
import React, { useState } from "react";
import * as Form from "@radix-ui/react-form";
import * as Select from "@radix-ui/react-select";
import ArrowDown from "@/icons/arrow-down-paynes.svg";
import Check from "@/icons/checkmark.svg";
import Upload from "@/icons/upload.svg";
import Image from "next/image";

type Props = {
  inputId: string
  labelText: string
  required: true | false
  options?: { label: string; value: string; }[]
  type: "text" | "time" | "file" | "select" | "longDesc" | "password" | "number"
  changePayment?: (value: string) => void
}

const Input = ({ inputId, labelText, options, type, changePayment, required }: Props) => {
  let input;

  const setIfPayment = (value: string) => {
    if (changePayment) {
      changePayment(value);
    }
  };

  const [uploadedFile, setUploadedFile] = useState<string | null>(null)

  const handleFileSelected = (event: any): void => {
    if (event.target.files && event.target.files[0]) {
      setUploadedFile(URL.createObjectURL(event.target.files[0]));
    }
    console.log(uploadedFile);

  }

  switch (type) {
    case "longDesc":
      input = <textarea id={inputId} name={inputId} className="border-[1px] rounded-2 border-input-border text-body text-dark-gray py-2 px-3 focus:outline-dark-gray" required={required} />
      break;
    case "file":
      input = <input onChange={handleFileSelected} type="file" accept="image/png, image/jpeg" id={inputId} required={required} className="hidden" />
      break;
    case "time":
      input = <input type="datetime-local" id={inputId} name={inputId} min="2020-06-07T00:00" max="2030-06-14T00:00" className="border-[1px] border-input-border rounded-2 text-body text-dark-gray py-2 px-3 focus:outline-dark-gray cursor-pointer calendar-picker-indicator:bg-[url('/assets/icons/calendar.svg')] calendar-picker-indicator:dark-gray calendar-picker-indicator:cursor-pointer" required={required} />
      break;
    case "select":
      input = <Select.Root onValueChange={(value: string) => setIfPayment(value)} required={required}>
        <Select.Trigger className="flex items-center justify-between rounded-2 border-[1px] border-input-border text-body text-dark-gray py-2 px-3 focus:outline-dark-gray cursor-pointer group">
          <Select.Value placeholder="Select option" />
          <Select.Icon
            className="group-aria-expanded:rotate-180 ">
            <Image
              priority
              src={ArrowDown}
              alt="Arrow down"
            />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content
            align="start"
            position="popper"
            className="overflow-hidden bg-white rounded-2 border-[1px] w-[275px] border-card-border shadow-card will-change-[opacity,transform] data-[side=bottom]:animate-slideUpAndFade">
            <Select.Viewport>
              <Select.Group className="px-2 py-3 w-full">
                {options?.map(option => (
                  <Select.Item value={option.value} key={option.value} className="text-dark-gray px-2 pb-3 last:pb-0 cursor-pointer flex justify-between items-center hover:outline-none focus:outline-none truncate data-[state=checked]:font-semibold">
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
                ))}
              </Select.Group>
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
      break;
    default:
      input = <input type={type} id={inputId} name={inputId} className="border-[1px] rounded-2 border-input-border text-body text-dark-gray py-2 px-3 focus:outline-dark-gray" required={required} />
      break;
  }

  return (
    <Form.Field name={inputId} className="flex flex-col justify-end gap-1 text-label text-dark-gray w-full">

      <Form.Label htmlFor={inputId}>{labelText}</Form.Label>
      <Form.Message className="text-label text-[red]" match="valueMissing">
        Please enter a {labelText}
      </Form.Message>
      <Form.Message className="text-label text-[red]" match="typeMismatch">
        Please provide a valid {labelText}
      </Form.Message>
      {type == "file" && (
        !uploadedFile ? (
          <Form.Label htmlFor={inputId} className="cursor-pointer image-input">
            <div className="flex flex-col items-center p-5 gap-5">
              <Image
                priority
                src={Upload}
                alt="Upload"
              />
              <p className="text-body text-slate-gray">Drag and drop or click to upload file</p>
            </div>
          </Form.Label>) : (
          <div className="image-input relative h-24 overflow-hidden before:absolute before:w-full before:h-full before:top-0 before:left-0 before:z-10">
            <img alt="preview image" src={uploadedFile} className="w-full h-full object-cover relative border-2 border-white rounded-2" />
          </div>

        )
      )}
      <Form.Control asChild>
        {input}
      </Form.Control>
    </Form.Field>
  )
}

export default Input;
