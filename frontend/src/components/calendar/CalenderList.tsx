import CardDivider from "../ui/CardDivider";
import { convertToDate, convertToTime } from "../../helpers/helpers";
import Link from "next/link";
import Image from "next/image";
import clock from "@/icons/clock.svg";
import calendar from "@/icons/calendar.svg";
import pin from "@/icons/pin.svg";

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
    <div className='w-100 lg:w-[160px] xl:w-[275px]'>
      <div className="mb-6">
        <h2 className="flex h-[30px] items-center text-h2">
          {selectedDate.day} {selectedDate.month} {selectedDate.year}
        </h2>
      </div>
      <CardDivider />
      <div className="mt-6 flex gap-2 flex-col">
        {!selectedDateEvents.length && <p className="text-label text-slate-gray">No events on this day</p>}
        {selectedDateEvents?.map((event, index) => (
          <Link
            key={index}
            className="block p-3 border rounded-sm border-input-border text-dark-gray"
            href={`/dashboard/events/${event.id}`}
          >
            <h4 className="mb-3 text-body text-overflow-ellipsis">{event.title}</h4>
            <div className="flex flex-col gap-1">
              <div className="flex gap-2 items-center">
                <Image priority src={calendar} alt="Calender icon" width={14} />
                <p className="mt-[1px] text-label text-slate-gray">
                  {convertToDate(event.startDate) === convertToDate(event.endDate)
                    ? convertToDate(event.startDate)
                    : `${convertToDate(event.startDate)} - ${convertToDate(
                        event.endDate
                      )}`}
                </p>
              </div>
              <div className="flex gap-2">
                <Image priority src={clock} alt="Clock icon" width={14} />
                <p className="mt-[1px] text-label text-slate-gray">
                  {convertToTime(event.startDate) === convertToTime(event.endDate)
                    ? convertToTime(event.startDate)
                    : `${convertToTime(event.startDate)} - ${convertToTime(
                        event.endDate
                      )}`}
                </p>
              </div>
              <div className="flex gap-2 items-center">
                <Image priority src={pin} alt="Pin icon" width={14} />
                <p className="mt-[1px] text-label text-slate-gray">{event.location}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CalendarList;
