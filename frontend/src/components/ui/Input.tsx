"use client";
import { useState } from "react";
import * as Form from "@radix-ui/react-form";
import * as Select from "@radix-ui/react-select";
import ArrowDown from "@/icons/arrow-down-paynes.svg";
import Check from "@/icons/checkmark.svg";
import Close from "@/icons/close.svg";
import Upload from "@/icons/upload.svg";
import Image from "next/image";

type Props = {
  inputId: string;
  labelText: string;
  required: true | false;
  options?: { label: string; value: string }[];
  type:
  | "text"
  | "email"
  | "time"
  | "file"
  | "select"
  | "longDesc"
  | "password"
  | "number";
  changePayment?: (value: string) => void;
  getData: (event: any) => void;
};

const Input = ({
  inputId,
  labelText,
  options,
  type,
  changePayment,
  required,
  getData,
}: Props) => {
  let input;

  const setIfPayment = (value: string) => {
    if (changePayment) {
      changePayment(value);
    }
  };

  const [uploadedFile, setUploadedFile] = useState<string | null>(null);

  const handleFileSelected = (event: any): void => {
    if (event.target.files && event.target.files[0]) {
      setUploadedFile(URL.createObjectURL(event.target.files[0]));
    }
    // console.log(uploadedFile);
  };

  const handleClearImage = () => {
    const target = event?.target as Element;
    let input = target.parentElement?.parentElement?.parentElement?.querySelector("input");
    if (input) { input.value = ''; }
    setUploadedFile(null);
  }

  switch (type) {
    case "longDesc":
      input = (
        <textarea
          id={inputId}
          name={inputId}
          className="rounded-sm border-[1px] border-input-border px-3 py-2 text-body text-dark-gray focus:outline-dark-gray"
          required={required}
          onChange={getData}
        />
      );
      break;
    case "file":
      input = (
        <input
          onChange={() => {
            handleFileSelected(event);
            getData(event);
          }}
          type="file"
          accept="image/png, image/jpeg"
          id={inputId}
          name={inputId}
          required={required}
          className="hidden"
        />
      );
      break;
    case "password":
      input = (
        <input
          type={type}
          id={inputId}
          name={inputId}
          onChange={getData}
          className="rounded-sm border-[1px] border-input-border px-3 py-2 text-body text-dark-gray focus:outline-dark-gray"
          required={required}
        />
      );
      break;
    case "select":
      input = (
        <Select.Root
          onValueChange={(value: string) => {
            getData(value);
            setIfPayment(value);
          }}
          required={required}
          name={inputId}
        >
          <Select.Trigger className="rounded-sm group flex cursor-pointer items-center justify-between border-[1px] border-input-border px-3 py-2 text-body text-dark-gray focus:outline-dark-gray">
            <Select.Value placeholder="Select option" />
            <Select.Icon className="group-aria-expanded:rotate-180 ">
              <Image priority src={ArrowDown} alt="Arrow down" />
            </Select.Icon>
          </Select.Trigger>
          <Select.Portal>
            <Select.Content
              align="start"
              position="popper"
              className="rounded-sm w-[275px] overflow-hidden border-[1px] border-card-border bg-white shadow-card will-change-[opacity,transform] data-[side=bottom]:animate-slideUpAndFade"
            >
              <Select.Viewport>
                <Select.Group className="w-full px-2 py-3">
                  {options?.map((option) => (
                    <Select.Item
                      value={option.value}
                      key={option.value}
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
                  ))}
                </Select.Group>
              </Select.Viewport>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      );
      break;
    default:
      input = (
        <input
          type={type}
          id={inputId}
          name={inputId}
          onChange={getData}
          className="rounded-sm border-[1px] border-input-border px-3 py-2 text-body text-dark-gray focus:outline-dark-gray"
          required={required}
        />
      );
      break;
  }

  return (
    <Form.Field
      name={inputId}
      className="flex w-full flex-col justify-end gap-1 text-label text-dark-gray"
    >
      <Form.Label htmlFor={inputId}>{labelText}</Form.Label>
      <Form.Message className="text-label text-[red]" match="valueMissing">
        Please enter a {labelText}
      </Form.Message>
      <Form.Message className="text-label text-[red]" match="typeMismatch">
        Please provide a valid {labelText}
      </Form.Message>
      {type == "file" &&
        (!uploadedFile ? (
          <Form.Label
            htmlFor={inputId}
            className="image-input h-28 cursor-pointer"
          >
            <div className="flex h-full flex-col items-center justify-center gap-2 p-5">
              <Image priority src={Upload} alt="Upload" />
              <p className="text-label text-slate-gray">
                Drag and drop or click to upload file
              </p>
            </div>
          </Form.Label>
        ) : (
          <div className="image-input relative h-28 overflow-hidden before:absolute before:left-0 before:top-0 before:z-[1] before:h-full before:w-full">
            <img
              alt="preview image"
              src={uploadedFile}
              className="rounded-sm relative h-full w-full border-2 border-white object-cover"
            />
            <div
              onClick={() => handleClearImage()}
              className="group absolute right-2 top-2 z-10 inline-flex h-6 w-6 cursor-pointer items-center justify-center overflow-hidden rounded-full p-1"
            >
              <div className="absolute h-full w-full opacity-[0.15] group-hover:bg-dark-gray"></div>
              <Image priority src={Close} alt="Close" width={10} height={10} />
            </div>
          </div>
        ))}
      <Form.Control asChild>{input}</Form.Control>
    </Form.Field>
  );
};

export default Input;
