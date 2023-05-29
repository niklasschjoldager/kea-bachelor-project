import { useEffect, useState } from "react";
import { EventProps } from "./components/Event";
import EventList from "./components/EventList";

function App() {
  const [events, setEvents] = useState<EventProps[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getEvents() {
      const request = await fetch(
        "https://backend-1-k4591778.deta.app/users/1/events",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const response = await request.json();
      setEvents(response);
      setIsLoading(false);
    }

    getEvents();
  }, []);

  return (
    <>
      <h2 className="text-lg">Events</h2>
      {isLoading ? <p>Loading...</p> : <EventList events={events} />}
    </>
  );
}

export default App;
