import Image from 'next/image';

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
    console.log(events)
    return (
        <div className="flex gap-6 flex-col">
            {events.map((event, index) => (
                <div key={index} className="bg-white rounded-2 shadow-card flex">
                    <div
                        className='basis-1/2'
                        style={{
                        backgroundImage: `url(/images/${event.image_path}.png)`,
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        width: "100%",
                        height: "auto"
                        }}
                    />
                    <div className='basis-1/2 px-[24px] py-[38px]'>
                        <h2 className="text-h2 mb-3 text-dark-gray">{event.title}</h2>
                        <p className="text-label text-dark-gray-">{event.short_desc}</p>
                        <p className="text-label text-slate-gray">{event.date}</p>
                        <p className="text-label text-slate-gray">{event.time}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default EventsList;