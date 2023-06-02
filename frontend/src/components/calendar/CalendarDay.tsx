import { useRef } from "react";

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
  const dayIsActive =
    selectedDate.day === day.dayInfo.day &&
    selectedDate.month === day.dayInfo.month &&
    selectedDate.year === day.dayInfo.year
      ? true
      : false;

  return (
    <div
      onClick={() => {
        if (!day.isDisabled) {
          getSelectedDate?.(day.dayInfo);
        }
      }}
      className={`rounded-sm flex aspect-square cursor-pointer flex-col gap-1 border border-input-border p-1.5 transition ${
        day.isDisabled ? "pointer-events-none opacity-40" : "text-dark-gray"
      } ${dayIsActive && !day.isDisabled ? "bg-ghost-white" : ""}`}
    >
      <p className="text-label text-paynes-gray">{day.dayInfo.day}</p>
      {!day.isDisabled &&
        events.map((event, index) => {
          console.log(event)
          return (
            <div
              key={index}
              className={`rounded-sm bg-paynes-gray px-2 py-0.5 text-white ${
                dayIsActive ? "border-white" : ""
              }`}
            >
              <p className="text-label">{event.title}</p>
            </div>
          );
        })
      }
    </div>
  );
};

export default CalendarDay;
