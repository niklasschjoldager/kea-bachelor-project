import { useState, useEffect } from "react";

type Props = {
  day: {
    key: string;
    isDisabled: boolean;
    dayInfo: {
      day: number;
      month: string;
      year: number;
    };
  };
  events: {
    title: string;
    short_description: string;
    startDate: string;
    endDate: string;
    time: string;
    address: string;
    image_path: string;
    location: string;
  }[];
  selectedDate: { day: number; month: string; year: number };
  getSelectedDate?: (selectedDate: {
    day: number;
    month: string;
    year: number;
  }) => any;
};

const CalendarDay = ({ day, selectedDate, getSelectedDate, events }: Props) => {
  function getCurrentDimension() {
    return {
      width: window.innerWidth,
      height: window.innerHeight
    }
  }
  const [screenSize, setScreenSize] = useState(getCurrentDimension());

  useEffect(() => {
    const updateDimension = () => {
      setScreenSize(getCurrentDimension())
    }
    window.addEventListener('resize', updateDimension);

    return (() => {
      window.removeEventListener('resize', updateDimension);
    })
  }, [screenSize])

  const dayIsActive =
    selectedDate.day === day.dayInfo.day &&
      selectedDate.month === day.dayInfo.month &&
      selectedDate.year === day.dayInfo.year
      ? true
      : false;

  const overflowingEvents = events.length > 1 ? events.length - 2 : 0

  return (
    <div
      onClick={() => {
        if (!day.isDisabled) {
          getSelectedDate?.(day.dayInfo);
        }
      }}
      className={`rounded-sm flex flex-col justify-center items-center md:justify-start md:items-start aspect-square cursor-pointer gap-[2px] lg:gap-1 border border-input-border p-0.5 md:p-1.5 transition ${day.isDisabled ? "pointer-events-none opacity-40" : "text-dark-gray"
        } ${dayIsActive && !day.isDisabled ? "bg-ghost-white" : ""}`}
    >
      <p className="text-label text-paynes-gray">{day.dayInfo.day}</p>
      {!day.isDisabled && screenSize.width > 768
        ?
        <>
          <>{events.map((event, index) => {
            return index < 2 ? (
              <div
                key={index}
                className={`rounded-sm bg-paynes-gray px-2 py-0.1 text-white w-full ${dayIsActive ? "border-white" : ""
                  }`}
                >
                  <p className="text-label text-overflow-ellipsis">{event.title}</p>
                </div>
              ):(null);
            })}</>
            <>{overflowingEvents > 0 && <p className="text-label text-slate-gray">{overflowingEvents} more...</p>}</>
          </>
        : <div className={events.length > 0 && !day.isDisabled ? `w-[5px] h-[5px] rounded-full bg-paynes-gray` : ''}></div>
      }
    </div>
  );
};

export default CalendarDay;
