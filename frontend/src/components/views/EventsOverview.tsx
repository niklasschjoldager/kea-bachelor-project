import EventsList from "@/components/common/EventsList";
import ViewSwitcher from "@/components/ui/ViewSwitcher";
import Modal from "@/components/ui/Modal";
import EventForm from "@/components/forms/EventForm";
import Calender from '@/components/calendar/Calendar'


const EventsOverview = () => {
    const events = [
        {
            'title': 'Vinfestival',
            'short_desc': 'Så slår vi igen pavillonerne op i vores gårdhave og inviterer nogle af vores producenter herop. Kom og mød de dejlige mennesker, der laver vinene, og smag på varerne.',
            'date': '12/04/2023',
            'time': '16:00 - 23:00',
            'address': 'Prins Valdemars Alle 5C, 3450 Allerød',
            'image_path': 'image_1',

        },
        {
            'title': 'Wine & Dine på Espehus Kro',
            'short_desc': 'Vi gentager succesen fra sidste år og teamer endnu engang op med Espehus Kro for en mindeværdig wine & dine aften, denne gang med vine fra både Di Meo og Marion.',
            'date': '12/04/2023',
            'time': '16:00 - 23:00',
            'address': 'Prins Valdemars Alle 5C, 3450 Allerød',
            'image_path': 'image_2'

        },
        {
            'title': 'Kældersmagning deluxe',
            'short_desc': 'Så er der igen linet op til en af de rigtig gode aftener. Her kommer de store og sjældne vine frem fra kælderen. Og vi har et par spændende nyheder med her også...',
            'date': '04/07/2023',
            'time': '16:00 - 23:00',
            'address': 'Prins Valdemars Alle 5C, 3450 Allerød',
            'image_path': 'image_3'

        },
        {
            'title': 'Vinfestival',
            'short_desc': 'Så slår vi igen pavillonerne op i vores gårdhave og inviterer nogle af vores producenter herop. Kom og mød de dejlige mennesker, der laver vinene, og smag på varerne.',
            'date': '20/06/2023',
            'time': '16:00 - 23:00',
            'address': 'Prins Valdemars Alle 5C, 3450 Allerød',
            'image_path': 'image_1'

        },
        {
            'title': 'Vinfestival',
            'short_desc': 'Så slår vi igen pavillonerne op i vores gårdhave og inviterer nogle af vores producenter herop. Kom og mød de dejlige mennesker, der laver vinene, og smag på varerne.',
            'date': '19/05/2023',
            'time': '16:00 - 23:00',
            'address': 'Prins Valdemars Alle 5C, 3450 Allerød',
            'image_path': 'image_1'

        },
    ]


    const views = [{ text: 'List', icon: 'list', position: 'left' }, { text: 'Calendar', icon: 'calendar', position: 'right' }]
    return (
        <>
            <div className='flex justify-between items-center mb-8'>
                <h1 className='text-h1'>Events</h1>
                <Modal title={"Create an event"} buttonText={"Create event"} children={<EventForm />} />
            </div>
            <div className='flex justify-between items-end mb-6'>
                <h2 className='text-h2 text-slate-gray leading-none'>May</h2>
                <ViewSwitcher views={views} />
            </div>
            {/* <EventsList events={events} /> */}
            <Calender events={events} />
        </>
    )
}

export default EventsOverview;
