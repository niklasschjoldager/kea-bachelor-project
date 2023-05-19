import TopNav from "@/components/TopNav";
import EventsOverview from "@/components/EventsOverview";

export default async function Events() {
  const sites = ["My site", "My other site", "My third site"];

  return (
    <main>
      <TopNav sites={sites} />
      <div className="mx-auto max-w-screen-lg px-4 py-[100px]">
        <EventsOverview />
      </div>
    </main>
  );
}
