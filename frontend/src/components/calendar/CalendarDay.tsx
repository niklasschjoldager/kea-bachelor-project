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
    selectedDate: { day: number; month: string; year: number; },
    getSelectedDate?: (selectedDate: { day: number; month: string; year: number; }) => any,
}

const CalendarDay = ({ day, selectedDate, getSelectedDate }: Props) => {

    const dayIsActive = ((selectedDate.day === day.dayInfo.day && selectedDate.month === day.dayInfo.month) ? true : false);

    return (
        <div
            onClick={() => { if (!day.isDisabled) {getSelectedDate?.(day.dayInfo)}; }}
            className={`aspect-square cursor-pointer border rounded-2 border-input-border p-1.5 transition ${day.isDisabled ? 'opacity-40 pointer-events-none' : 'text-dark-gray'} ${dayIsActive && !day.isDisabled ? 'bg-ghost-white' : ''}`}
            >
                <p className='text-paynes-gray text-body'>
                    {day.dayInfo.day}
                </p>
        </div>
    )
}

export default CalendarDay;