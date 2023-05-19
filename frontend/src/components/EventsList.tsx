import Image from "next/image";
import clock from "@/icons/clock.svg";
import calendar from "@/icons/calendar.svg";
import pin from "@/icons/pin.svg";

type Props = {
  events: {
    title: string;
    short_desc: string;
    date: string;
    time: string;
    address: string;
    image_path: string;
  }[];
};

const EventsList = ({ events }: Props) => {
  return (
    <div className="flex flex-col gap-6">
      {events.map((event, index) => (
        <div
          key={index}
          className="bg-white border rounded-2 border-card-border shadow-card md:flex"
        >
          <div
            className="h-[200px] basis-1/2 md:h-auto"
            style={{
              backgroundImage: `url(/images/${event.image_path}.png)`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              width: "100%",
            }}
          />
          <div className="basis-1/2 px-[24px] py-[38px]">
            <h3 className="mb-3 text-h3 text-dark-gray">{event.title}</h3>
            <p className="mb-6 text-label text-dark-gray-faded">
              {event.short_desc}
            </p>
            <div className="flex flex-wrap gap-3">
              <p className="flex items-center gap-2 text-label text-slate-gray">
                <Image priority src={calendar} alt="Calender icon" width={18} />
                {event.date}
              </p>
              <p className="flex items-center gap-2 text-label text-slate-gray">
                <Image priority src={clock} alt="Clock icon" width={18} />
                {event.time}
              </p>
              <p className="flex items-center gap-2 basis-full text-label text-slate-gray">
                <Image priority src={pin} alt="Pin icon" width={18} />
                {event.address}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventsList;
