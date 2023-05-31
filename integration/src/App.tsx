import { useEffect, useState } from "react";
import { EventProps } from "./components/Event";
import EventList from "./components/EventList";

interface AppProps {
  integrationId: string;
}

function App({ integrationId }: AppProps) {
  const [events, setEvents] = useState<EventProps[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getEvents() {
      const request = await fetch(
        `https://backend-1-k4591778.deta.app/users/${integrationId}/events`,
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
  }, [integrationId]);

  return (
    <div className="max-w-lg px-4 py-8 mx-auto">
      <h2 className="text-h1">Events</h2>
      {isLoading ? <p>Loading...</p> : <EventList events={events} />}
    </div>
  );
}

export default App;
