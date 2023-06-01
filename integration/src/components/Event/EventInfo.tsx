import { EventProps } from "../Event";
import { convertToDate, convertToTime } from "../../helpers/helpers";
import CardDivider from "../ui/CardDivider";
import * as Form from "@radix-ui/react-form";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { ChangeEvent, FormEvent } from "react";

type Props = {
  props: EventProps;
  signupState: string;
  eventType: string;
  availability: boolean;
  setSignupState: (string: string) => void;
  updateData: (event: ChangeEvent<HTMLInputElement>) => void;
  submit: (e: FormEvent<HTMLFormElement>) => void;
};

export const EventInfo = ({
  props,
  signupState,
  updateData,
  submit,
  eventType,
  setSignupState,
  availability,
}: Props) => {
  return (
    <>
      <div
        className={`p-6 flex flex-col gap-3 md:flex-row-reverse md:gap-6 ${
          signupState == "signup" ? "md:h-52 pb-0 md:pb-6" : ""
        }`}
      >
        <div
          className={`flex flex-col gap-3 py-5 md:w-1/2 ${
            signupState == "signup" ? "gap-6 md:gap-3 pb-0 md:py-5" : ""
          }`}
        >
          <h1 className="text-h1 text-dark-gray">{props.title}</h1>
          <p
            className={`text-body text-dark-gray-faded ${
              signupState == "signup" ? "hidden" : ""
            }`}
          >
            {props.short_description}
          </p>
          <div className="flex flex-wrap gap-3">
            <p className="flex items-center gap-2 text-label text-slate-gray">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                width="18"
                height="18"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                />
              </svg>
              {convertToDate(props.startDate) === convertToDate(props.endDate)
                ? convertToDate(props.startDate)
                : `${convertToDate(props.startDate)} - ${convertToDate(
                    props.endDate
                  )}`}
            </p>
            <p className="flex items-center gap-2 text-label text-slate-gray">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                width="18"
                height="18"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {convertToTime(props.startDate)} - {convertToTime(props.endDate)}
            </p>
            <p className="flex items-center gap-2 basis-full text-label text-slate-gray">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                width="18"
                height="18"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                />
              </svg>
              {props.location}
            </p>
          </div>
          <CardDivider />
          <p
            className={`text-body text-dark-gray-faded ${
              signupState == "signup" ? "hidden" : ""
            }`}
          >
            {props.long_description}
          </p>
        </div>

        <div
          className={`md:w-1/2 ${
            signupState == "signup" ? "hidden md:block" : ""
          }`}
        >
          <img
            src="https://picsum.photos/200"
            alt=""
            className="object-cover w-full h-full"
          />
        </div>
      </div>
      {signupState == "signup" ? (
        <Form.Root onSubmit={submit}>
          <div className="flex flex-col gap-6 p-6">
            <Input
              inputId={"full_name"}
              labelText={"Full name"}
              required={true}
              type={"text"}
              getData={updateData}
            />
            <Input
              inputId={"email"}
              labelText={"E-mail"}
              required={true}
              type={"text"}
              getData={updateData}
            />
            <Input
              inputId={"phone_number"}
              labelText={"Phone"}
              required={true}
              type={"number"}
              getData={updateData}
            />
            <Input
              inputId={"ticket_amount"}
              labelText={"Amount of tickets"}
              required={true}
              type={"number"}
              getData={updateData}
            />
          </div>

          <div className="flex flex-col items-center justify-between w-full gap-6 p-6 shadow-card md:py-3 md:flex-row">
            <p>
              Price per ticket: <b>{props.price} DKK</b>
            </p>
            <Form.Submit>
              <Button
                buttonText={
                  eventType === "payment"
                    ? "Go to payment"
                    : "Sign up for event"
                }
              />
            </Form.Submit>
          </div>
        </Form.Root>
      ) : (
        <div className="flex flex-col items-center justify-between w-full gap-6 p-6 shadow-card md:py-4 md:flex-row">
          {eventType == "free" ? (
            <p>You don't need to signup for this event</p>
          ) : (
            <>
              <p>
                Price per ticket: <b>{props.price} DKK</b>
              </p>
              <Button
                buttonText={availability ? "Sign up for event" : "Sold out"}
                onClick={() => (availability ? setSignupState("signup") : "")}
                state={availability ? "enabled" : "disabled"}
              />
            </>
          )}
        </div>
      )}
    </>
  );
};
