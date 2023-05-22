import TopNav from "@/components/TopNav";
import EventsOverview from "@/components/EventsOverview";

export default async function Events() {
  const sites = ["My site", "My other site", "My third site"];
  const navElements = ["Events", "Integration"];

  return (
    <main>
      <TopNav sites={sites} navElements={navElements} />
      <div className="mx-auto max-w-screen-lg px-4 py-[100px]">
        <EventsOverview />
      </div>
    </main>
  );
}
