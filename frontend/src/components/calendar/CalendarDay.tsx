import { useRef } from 'react';

type Props = {
    day: {
        key: string,
        isDisabled: boolean,
        dayInfo: {
            day: number,
            month: string,
            year: number
        }
    },
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
    selectedDate: { day: number; month: string; year: number; },
    getSelectedDate?: (selectedDate: { day: number; month: string; year: number; }) => any,
}

const CalendarDay = ({ day, selectedDate, getSelectedDate, events }: Props) => {

    const dayIsActive = ((selectedDate.day === day.dayInfo.day && selectedDate.month === day.dayInfo.month) ? true : false);

    return (
        <div
            onClick={() => { if (!day.isDisabled) {getSelectedDate?.(day.dayInfo)}; }}
            className={`flex gap-1 flex-col aspect-square cursor-pointer border rounded-2 border-input-border p-1.5 transition ${day.isDisabled ? 'opacity-40 pointer-events-none' : 'text-dark-gray'} ${dayIsActive && !day.isDisabled ? 'bg-ghost-white' : ''}`}
            >
                <p className="text-paynes-gray text-label">
                    {day.dayInfo.day}
                </p>

                {events.map((event, index) => {
                        return (
                            <div key={index} className={`bg-paynes-gray text-white px-2 py-0.5 rounded-2 ${dayIsActive ? 'border-white' : ''}`}>
                                <p className="text-label">{event.title}</p>
                            </div>
                        )
                    }
                )}
        </div>
    )
}

export default CalendarDay;