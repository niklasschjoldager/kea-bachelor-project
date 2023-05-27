import { useEffect, useState } from "react";

function App() {
  const [events, setEvents] = useState(null);

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
    }

    getEvents();
  }, []);

  return (
    <>
      <h2 className="text-lg">Events</h2>
      <pre>{JSON.stringify(events)}</pre>
    </>
  );
}

export default App;
