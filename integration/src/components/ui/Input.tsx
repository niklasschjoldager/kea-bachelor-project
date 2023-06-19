"use client";
import * as Form from "@radix-ui/react-form";

type Props = {
  inputId: string;
  labelText: string;
  required: true | false;
  max?: number;
  min?: number;
  minLength?: number;
  maxLength?: number;
  type: "text" | "number" | "email";
  getData: (event: any) => void;
};

const Input = ({
  inputId,
  labelText,
  type,
  required,
  min,
  max,
  minLength,
  maxLength,
  getData,
}: Props) => {
  const input = (
    <input
      type={type}
      id={inputId}
      name={inputId}
      onChange={getData}
      min={min}
      minLength={minLength}
      maxLength={maxLength}
      className="border-[1px] rounded-2 border-input-border text-body text-dark-gray py-2 px-3 focus:outline-dark-gray"
      required={required}
    />
  );

  return (
    <Form.Field
      name={inputId}
      className="flex flex-col justify-end w-full gap-1 text-label text-dark-gray"
    >
      <Form.Label htmlFor={inputId}>{labelText}</Form.Label>
      <Form.Message className="text-label text-[red]" match="valueMissing">
        Please enter a {labelText}
      </Form.Message>
      <Form.Message className="text-label text-[red]" match="typeMismatch">
        Please provide a valid {labelText}
      </Form.Message>
      <Form.Message className="text-label text-failed" match="tooLong">
        {labelText} has to be maximum {maxLength} characters
      </Form.Message>
      <Form.Message className="text-label text-failed" match="tooShort">
        {labelText} has to be a minimum {minLength} characters
      </Form.Message>
      <Form.Message className="text-label text-failed" match="rangeUnderflow">
        {labelText} has to be minimum {min}
      </Form.Message>
      <Form.Message className="text-label text-failed" match="rangeOverflow">
        {labelText} has to be maximum {max}
      </Form.Message>
      <Form.Control asChild>{input}</Form.Control>
    </Form.Field>
  );
};

export default Input;
