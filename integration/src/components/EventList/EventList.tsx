import Event, { EventProps } from "../Event";

interface EventListProps {
  events: EventProps[] | null;
}

function EventList({ events }: EventListProps) {

  return events && events.length > 0 ? (
    <div className="grid gap-6">
      {events.map((event) => (
        <Event key={event.id} {...event} />
      ))}
    </div>
  ) : (
    <p>No events</p>
  );
}

export default EventList;
