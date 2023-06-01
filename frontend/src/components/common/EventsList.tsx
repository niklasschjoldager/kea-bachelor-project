import Image from "next/image";
import clock from "@/icons/clock.svg";
import calendar from "@/icons/calendar.svg";
import pin from "@/icons/pin.svg";
import { convertToDate, convertToTime } from "../../helpers/helpers";
import Link from "next/link";

type Props = {
  events: {
    id: number;
    title: string;
    short_description: string;
    startDate: string;
    endDate: string;
    time: string;
    address: string;
    image: string;
    location: string;
  }[];
};

const EventsList = ({ events }: Props) => {
  return (
    <div className="flex flex-col gap-6">
      {events?.map((event, index) => (
        <Link
          href={`/events/${event.id}`}
          key={index}
          className="bg-white border rounded-sm border-card-border shadow-card md:flex"
        >
          <div
            className="h-[200px] basis-1/2 md:h-auto"
            style={{
              backgroundImage: `url(${
                process.env.NEXT_PUBLIC_REST_API_URL || "http://127.0.0.1:8000"
              }/images/${event.image})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              width: "100%",
            }}
          ></div>
          <div className="basis-1/2 px-[24px] py-[38px]">
            <h3 className="mb-3 text-h3 text-dark-gray">{event.title}</h3>
            <p className="mb-6 text-label text-dark-gray-faded">
              {event.short_description}
            </p>
            <div className="flex flex-wrap gap-3">
              <p className="flex items-center gap-2 text-label text-slate-gray">
                <Image priority src={calendar} alt="Calender icon" width={18} />
                {convertToDate(event.startDate) === convertToDate(event.endDate)
                  ? convertToDate(event.startDate)
                  : `${convertToDate(event.startDate)} - ${convertToDate(
                      event.endDate
                    )}`}
              </p>
              <p className="flex items-center gap-2 text-label text-slate-gray">
                <Image priority src={clock} alt="Clock icon" width={18} />
                {convertToTime(event.startDate) === convertToTime(event.endDate)
                  ? convertToTime(event.startDate)
                  : `${convertToTime(event.startDate)} - ${convertToTime(
                      event.endDate
                    )}`}
              </p>
              <p className="flex items-center gap-2 basis-full text-label text-slate-gray">
                <Image priority src={pin} alt="Pin icon" width={18} />
                {event.location}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default EventsList;
