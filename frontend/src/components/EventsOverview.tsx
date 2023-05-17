import EventsList from './EventsList'

const EventsOverview = () => {
    const events = [
        {
            'title': 'Vinfestival',
            'short_desc': 'Så slår vi igen pavillonerne op i vores gårdhave og inviterer nogle af vores producenter herop. Kom og mød de dejlige mennesker, der laver vinene, og smag på varerne.',
            'date': 'Fredag 12 April',
            'time': '16:00 - 23:00',
            'address': 'Prins Valdemars Alle 5C, 3450 Allerød',
            'image_path': 'image_1',

        },
        {
            'title': 'Wine & Dine på Espehus Kro',
            'short_desc': 'Vi gentager succesen fra sidste år og teamer endnu engang op med Espehus Kro for en mindeværdig wine & dine aften, denne gang med vine fra både Di Meo og Marion.',
            'date': 'Fredag 12 April',
            'time': '16:00 - 23:00',
            'address': 'Prins Valdemars Alle 5C, 3450 Allerød',
            'image_path': 'image_2'

        },
        {
            'title': 'Kældersmagning deluxe',
            'short_desc': 'Så er der igen linet op til en af de rigtig gode aftener. Her kommer de store og sjældne vine frem fra kælderen. Og vi har et par spændende nyheder med her også...',
            'date': 'Fredag 12 April',
            'time': '16:00 - 23:00',
            'address': 'Prins Valdemars Alle 5C, 3450 Allerød',
            'image_path': 'image_3'

        },
        {
            'title': 'Vinfestival',
            'short_desc': 'Så slår vi igen pavillonerne op i vores gårdhave og inviterer nogle af vores producenter herop. Kom og mød de dejlige mennesker, der laver vinene, og smag på varerne.',
            'date': 'Fredag 12 April',
            'time': '16:00 - 23:00',
            'address': 'Prins Valdemars Alle 5C, 3450 Allerød',
            'image_path': 'image_1'

        },
    ]

    return (
        <EventsList events={events} />
    )
}

export default EventsOverview;