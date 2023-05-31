import { EventProps } from "../Event"
import { convertToDate, convertToTime } from "../helpers/helpers"
import calendar from "../../assets/calendar.svg"
import clock from "../../assets/clock.svg"
import pin from "../../assets/pin.svg"
import CardDivider from "../ui/CardDivider"
import Button from "../ui/Button"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import * as Form from '@radix-ui/react-form';
import Input from "../ui/Input"

type Props = {
    props: EventProps
}

function EventSingleView({ props }: Props) {
    const [eventType, setEventType] = useState<string>("free")
    const [signupState, setSignupState] = useState<string>("preSignup")
    const [data, setData] = useState({})
    console.log(props.id);


    useEffect(() => {
        if (props.ticket_quantity && props.ticket_quantity > 0 && props.price && props.price > 0) {
            setEventType("payment")
        } else if (props.ticket_quantity && props.ticket_quantity > 0) {
            setEventType("signup")
        }
    }, [eventType, props.price, props.ticket_quantity])
    console.log(eventType);

    const submit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(data);
        if (eventType === "payment") {
            console.log("Go to payment");
        } else if (eventType === "signup") {
            const request = await fetch(
                `http://127.0.0.1:8000/events/${props.id}/orders`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                }
            );
            const response = await request.json();
            console.log(response);
            console.log("You are signed up!");
            setSignupState("success")
        }

    }

    const updateData = (event: ChangeEvent<HTMLInputElement>) => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        })
    }

    return (
        <>
            <div className={`p-6 flex flex-col gap-3 md:flex-row-reverse md:gap-6 ${signupState == "signup" ? "md:h-52 pb-0 md:pb-6" : ""}`}>
                <div className={`flex flex-col gap-3 py-5 md:w-1/2 ${signupState == "signup" ? "gap-6 md:gap-3 pb-0 md:py-5" : ""}`}>
                    <h1 className="text-h1 text-dark-gray">{props.title}</h1>
                    <p className={`text-body text-dark-gray-faded ${signupState == "signup" ? "hidden" : ""}`}>{props.short_description}</p>
                    <div className="flex flex-wrap gap-3">
                        <p className="flex items-center gap-2 text-label text-slate-gray">
                            <img src={calendar} alt="Calender icon" className="w-[18px]" />
                            {
                                convertToDate(props.startDate) === convertToDate(props.endDate)
                                    ? convertToDate(props.startDate)
                                    : `${convertToDate(props.startDate)} - ${convertToDate(props.endDate)}`
                            }
                        </p>
                        <p className="flex items-center gap-2 text-label text-slate-gray">
                            <img src={clock} alt="Clock icon" className="w-[18px]" />
                            {
                                convertToTime(props.startDate) === convertToTime(props.endDate)
                                    ? convertToTime(props.startDate)
                                    : `${convertToTime(props.startDate)} - ${convertToTime(props.endDate)}`
                            }
                        </p>
                        <p className="flex items-center gap-2 basis-full text-label text-slate-gray">
                            <img src={pin} alt="Pin icon" className="w-[18px]" />
                            {props.location}
                        </p>
                    </div>
                    <CardDivider />
                    <p className={`text-body text-dark-gray-faded ${signupState == "signup" ? "hidden" : ""}`}>{props.long_description}</p>
                </div>

                <div className={`md:w-1/2 ${signupState == "signup" ? "hidden md:block" : ""}`}>
                    <img src="https://picsum.photos/200" alt="" className="w-full h-full object-cover" />
                </div>
            </div>
            {signupState == "signup" ? (
                <Form.Root onSubmit={submit} >
                    <div className="p-6 flex flex-col gap-6">
                        <Input inputId={"full_name"} labelText={"Full name"} required={true} type={"text"} getData={updateData} />
                        <Input inputId={"email"} labelText={"E-mail"} required={true} type={"text"} getData={updateData} />
                        <Input inputId={"phone_number"} labelText={"Phone"} required={true} type={"number"} getData={updateData} />
                        <Input inputId={"ticket_amount"} labelText={"Amount of tickets"} required={true} type={"number"} getData={updateData} />
                    </div>

                    <div className="w-full p-6 shadow-card flex justify-between items-center flex-col gap-6 md:py-3 md:flex-row">
                        <p>Price per ticket: <b>{props.price} DKK</b></p>
                        <Form.Submit>
                            <Button buttonText={eventType === "payment" ? "Go to payment" : "Sign up for event"} />
                        </Form.Submit>

                    </div>

                </Form.Root>
            ) : (
                eventType !== "free" && (
                    <div className="w-full p-6 shadow-card flex justify-between items-center flex-col gap-6 md:py-3 md:flex-row">
                        <p>Price per ticket: <b>{props.price} DKK</b></p>
                        <Button buttonText={"Sign up for event"} onClick={() => setSignupState("signup")} />
                    </div>
                )
            )}
        </>
    )
}

export default EventSingleView;