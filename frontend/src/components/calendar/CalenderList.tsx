import CardDivider from "../ui/CardDivider";
import { convertToDate, convertToTime } from "../../helpers/helpers";

type Props = {
  selectedDateEvents: {
    id: number;
    title: string;
    short_description: string;
    startDate: string;
    endDate: string;
    time: string;
    address: string;
    image_path: string;
    location: string;
  }[];
  selectedDate: {
    day: number;
    month: string;
    year: number;
  };
};

const CalendarList = ({ selectedDateEvents, selectedDate }: Props) => {
  return (
    <div className="min-w-[275px]">
      <div className="mb-6">
        <h2 className="flex h-[30px] items-center text-h2">
          {selectedDate.day} {selectedDate.month} {selectedDate.year}
        </h2>
      </div>
      <CardDivider />
      {selectedDateEvents?.map((event, index) => (
        <a href={`/events/${event.id}`}
          key={index}
          className="rounded-sm mt-6 border border-input-border p-2 text-dark-gray-faded block"
        >
          <h4 className="mb-3 text-h4">{event.title}</h4>
          <p className="mt-1 text-label text-slate-gray">
            {convertToDate(event.startDate) === convertToDate(event.endDate)
              ? convertToDate(event.startDate)
              : `${convertToDate(event.startDate)} - ${convertToDate(
                event.endDate
              )}`}
          </p>
          <p className="mt-1 text-label text-slate-gray">
            {convertToTime(event.startDate) === convertToTime(event.endDate)
              ? convertToTime(event.startDate)
              : `${convertToTime(event.startDate)} - ${convertToTime(
                event.endDate
              )}`}
          </p>
          <p className="mt-1 text-label text-slate-gray">{event.location}</p>
        </a>
      ))}
    </div>
  );
};

export default CalendarList;
