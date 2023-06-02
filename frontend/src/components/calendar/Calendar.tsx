'use client'
import { useState } from 'react';
import { currentMonthNumber, currentMonthName, currentYear, currentDay, getCalenderData, months } from "../../helpers/getCalenderData"
import CalendarDay from "./CalendarDay"
import Card from '../ui/Card'
import { addLeadingZero } from "../../helpers/helpers"
import CalenderList from "./CalenderList"
import Image from 'next/image';
import arrowLeft from '../../../public/assets/icons/calendar-arrow-left.svg';
import arrowRight from '../../../public/assets/icons/calendar-arrow-right.svg';
import CardDivider from "../ui/CardDivider"
import { convertToDate, convertToTime } from "../../helpers/helpers"

let activeYear = currentYear;
let activeMonthNumber = currentMonthNumber;
let activeMonthName = months[currentMonthNumber];

type Props = {
    events: {
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
};

const Calendar = ({ events }: Props) => {
    let [calenderData, setCalenderData] = useState(getCalenderData(activeYear, activeMonthNumber))

    const currentDateInfo = {
        "day": currentDay,
        "month": currentMonthName,
        "year": currentYear
    }

    // set selected date to current date
    const [selectedDate, setSelectedDate] = useState(currentDateInfo)

    const selectedDay = selectedDate.day;
    const selectedMonth = months.indexOf(selectedDate.month);
    const selectedYear = selectedDate.year

    // set events to events from current date
    const formattedSelectedDate = addLeadingZero(selectedDay) + "/" + addLeadingZero(selectedMonth + 1) + "/" + selectedYear;
    const currentDateEvents = events?.filter(event => convertToDate(event.startDate) === formattedSelectedDate)

    const [selectedDateEvents, setSelectedDateEvents] = useState(currentDateEvents)

    // get date selected by user
    const getSelectedDate = (thisSelectedDate: { day: number; month: string; year: number; }) => {
        setSelectedDate(thisSelectedDate)

        // update events from selected date
        const formattedThisDate = addLeadingZero(thisSelectedDate.day) + "/" + addLeadingZero(months.indexOf(thisSelectedDate.month) + 1) + "/" + selectedYear;
        const selectedDateEvents = events?.filter(event => convertToDate(event.startDate) === formattedThisDate || convertToDate(event.endDate) === formattedThisDate)
        setSelectedDateEvents(selectedDateEvents);
    }

    // update calender data to previus month on click back
    const handleClickBack = () => {
        activeMonthNumber = activeMonthNumber - 1;
        activeMonthName = months[activeMonthNumber];

        if (activeMonthNumber === -1) {
            activeYear = activeYear - 1;
            activeMonthNumber = 11;
            activeMonthName = months[activeMonthNumber];
        }

        setCalenderData(getCalenderData(activeYear, activeMonthNumber))
    }

    // update calender data to next month on click back
    const handleClickForward = () => {
        activeMonthNumber = activeMonthNumber + 1;
        activeMonthName = months[activeMonthNumber];

        if (activeMonthNumber === 12) {
            activeYear = activeYear + 1;
            activeMonthNumber = 0;
            activeMonthName = months[activeMonthNumber];
        }

        setCalenderData(getCalenderData(activeYear, activeMonthNumber))
    }


    return (
        <div className='flex flex-col lg:flex-row gap-4'>
            <div className='grow'>
                <Card>
                    <div className='flex justify-center items-center gap-8'>
                        <div onClick={handleClickBack} className="bg-ghost-white rounded-full inline-flex w-[28px] justify-center items-center cursor-pointer">
                            <Image
                                priority
                                src={arrowLeft}
                                alt="Arrow left icon"
                                height={14}
                                className="m-2 pr-[1px]"
                            />
                        </div>
                        <h3 className='text-h3 min-w-[150px] text-center'>{activeMonthName} {activeYear}</h3>
                        <div onClick={handleClickForward} className="bg-ghost-white rounded-full inline-flex w-[28px] justify-center items-center cursor-pointer">
                            <Image
                                priority
                                src={arrowRight}
                                alt="Arrow right icon"
                                height={14}
                                className="m-2 pl-[1px]"
                            />
                        </div>
                    </div>
                    <CardDivider />
                    <div className='grid grid-cols-7 auto-cols-max gap-2'>
                        {calenderData.map((date, index) => {
                            const day = {
                                'key': date.id,
                                'isDisabled': date.isDisabled,
                                'dayInfo': {
                                    'day': date.day,
                                    'month': activeMonthName,
                                    'year': activeYear
                                }
                            }

                            let modifiedEvents = events.map(function (event) {
                                return { ...event, startDate: convertToDate(event.startDate), endDate: convertToDate(event.endDate) };
                            });

                            const thisDateEvents = modifiedEvents.filter(event => event.startDate === `${addLeadingZero(day.dayInfo.day)}/${addLeadingZero(activeMonthNumber + 1)}/${day.dayInfo.year}`);

                            return (
                                <CalendarDay key={index}
                                    selectedDate={selectedDate}
                                    day={day}
                                    getSelectedDate={getSelectedDate}
                                    events={thisDateEvents}
                                />
                            )
                        }
                        )}
                    </div>
                </Card>
            </div>
            <div>
                <Card>
                    <CalenderList selectedDateEvents={selectedDateEvents} selectedDate={selectedDate} />
                </Card>
            </div>
        </div>
    )
}

export default Calendar;