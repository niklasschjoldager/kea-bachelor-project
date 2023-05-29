import CardDivider from "../ui/CardDivider"
import { convertToDate, convertToTime } from "../../helpers/helpers"

type Props = {
    selectedDateEvents:
    {
        title: string;
        short_description: string;
        startDate: string;
        endDate: string;
        time: string;
        address: string;
        image_path: string;
        location: string;
    }[],
    selectedDate:
    {
        day: number;
        month: string;
        year: number;
    }
}

const CalendarList = ({ selectedDateEvents, selectedDate }: Props) => {
    return (
        <div className="min-w-[275px]">
            <div className="mb-6">
                <h2 className="text-h2 h-[30px] flex items-center">{selectedDate.day} {selectedDate.month} {selectedDate.year}</h2>
            </div>
            <CardDivider />
            {selectedDateEvents?.map((event, index) => (
                <div key={index} className="border border-input-border text-dark-gray-faded rounded-2 mt-6 p-2">
                    <h4 className="text-h4 mb-3">{event.title}</h4>
                    <p className="text-label text-slate-gray mt-1">
                    {
                    convertToDate(event.startDate) === convertToDate(event.endDate)
                    ? convertToDate(event.startDate)
                    : `${convertToDate(event.startDate)} - ${convertToDate(event.endDate)}`
                    }    
                    </p>
                    <p className="text-label text-slate-gray mt-1">
                    {
                    convertToTime(event.startDate) === convertToTime(event.endDate)
                    ? convertToTime(event.startDate)
                    : `${convertToTime(event.startDate)} - ${convertToTime(event.endDate)}`
                    }    
                    </p>
                    <p className="text-label text-slate-gray mt-1">{event.location}</p>
                </div>
            ))}
        </div>
    )
}

export default CalendarList;