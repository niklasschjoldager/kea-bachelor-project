import { EventProps } from "../Event"
import { convertToDate, convertToTime } from "../helpers/helpers"
import calendar from "../../assets/calendar.svg"
import clock from "../../assets/clock.svg"
import pin from "../../assets/pin.svg"
import CardDivider from "../ui/CardDivider"
import Button from "../ui/Button"

type Props = {
    props: EventProps
}

function EventSingleView({ props }: Props) {
    return (
        <>
            <div className="p-6 flex flex-col gap-3 md:flex-row-reverse md:gap-6">
                <div className="flex flex-col gap-3 py-5 md:w-1/2">
                    <h1 className="text-h1 text-dark-gray">{props.title}</h1>
                    <p className="text-body text-dark-gray-faded">{props.short_description}</p>
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
                    <p className="text-body text-dark-gray-faded">{props.long_description}</p>
                </div>

                <div className="md:w-1/2">
                    <img src="https://picsum.photos/200" alt="" className="w-full h-full object-contain" />
                </div>
            </div>
            <div className="w-full px-6 py-3 shadow-card flex justify-between items-center flex-col gap-6 md:flex-row">
                <p>Price per ticket: <b>{props.price} DKK</b></p>
                <Button buttonText={"Sign up for event"} />
            </div>
        </>
    )
}

export default EventSingleView;