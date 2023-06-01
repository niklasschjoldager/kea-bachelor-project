import { EventProps } from "../Event"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { EventInfo } from "./EventInfo";

type Props = {
    props: EventProps
}

function EventSingleView({ props }: Props) {
    const [eventType, setEventType] = useState<string>("free")
    const [signupState, setSignupState] = useState<string>("preSignup")
    const [successMessage, setSuccessMessage] = useState<string>("")
    const [data, setData] = useState<object>({})
    const [availability, setAvaliability] = useState<boolean>(false)

    useEffect(() => {
        if (props.ticket_quantity && props.ticket_quantity > 0 && props.price && props.price > 0) {
            setEventType("payment")
        } else if (props.ticket_quantity && props.ticket_quantity > 0) {
            setEventType("signup")
        }

        if (props.available_tickets > 0) {
            setAvaliability(true)
        }

    }, [eventType, props.price, props.ticket_quantity, props.id, props.available_tickets])
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
            console.log("You are signed up!");
            if (request.ok) {
                setSuccessMessage("Thank you for your participation. We look forward to seeing you!")
                console.log("OK");
            } else {
                setSuccessMessage(response.detail)
                console.log("NOT OK");
            }
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
        signupState == "success" ? (
            <div className="px-6 py-12">
                <p className="text-body text-dark-gray text-center">{successMessage}</p>
            </div>

        ) : (
            <EventInfo signupState={signupState} props={props} updateData={updateData} submit={submit} eventType={eventType} setSignupState={setSignupState} availability={availability} />
        )

    )
}

export default EventSingleView;