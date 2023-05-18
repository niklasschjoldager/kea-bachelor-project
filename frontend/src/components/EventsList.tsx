import Image from 'next/image';
import clock from '../../public/assets/icons/clock.svg';
import calendar from '../../public/assets/icons/calendar.svg';
import pin from '../../public/assets/icons/pin.svg';

type Props = {
    events: 
    {
        title: string,
        short_desc: string,
        date: string,
        time: string,
        address: string,
        image_path: string
    }[]
}

const EventsList = ({ events }: Props) => {
    return (
        <div className="flex gap-6 flex-col">
            {events.map((event, index) => (
                <div key={index} className="bg-white border-card-border border rounded-2 shadow-card md:flex">
                    <div
                        className='basis-1/2 h-[200px] md:h-auto'
                        style={{
                        backgroundImage: `url(/images/${event.image_path}.png)`,
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        width: "100%",
                        }}
                    />
                    <div className='basis-1/2 px-[24px] py-[38px]'>
                        <h2 className="text-h2 mb-3 text-dark-gray">{event.title}</h2>
                        <p className="text-label text-dark-gray-faded mb-6">{event.short_desc}</p>
                            <div className='flex gap-3 flex-wrap'>
                                <p className="text-label text-slate-gray flex items-center gap-2">
                                    <Image
                                        priority
                                        src={calendar}
                                        alt="Calender icon"
                                        width={18}
                                    />
                                    {event.date}
                                </p>
                                <p className="text-label text-slate-gray flex items-center gap-2">
                                    <Image
                                        priority
                                        src={clock}
                                        alt="Clock icon"
                                        width={18}
                                    />
                                    {event.time}
                                </p>
                                <p className="text-label text-slate-gray flex items-center gap-2 basis-full">
                                    <Image
                                        priority
                                        src={pin}
                                        alt="Pin icon"
                                        width={18}
                                    />
                                    {event.address}
                                </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default EventsList;