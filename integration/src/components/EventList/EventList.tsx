import Event, { EventProps } from "../Event";


interface EventListProps {
  events: EventProps[] | null;
}

function EventList({ events }: EventListProps) {
  return events ? (
    <>
      {events.map((event) => (

        <Event key={event.id} {...event} />

      ))}
    </>
  ) : (
    <p>No events</p>
  );
}

export default EventList;
