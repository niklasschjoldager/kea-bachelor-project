import TopNav from "@/components/common/TopNav";
import EventsOverview from "@/components/views/EventsOverview";

export default async function Events() {

  return (
    <main>
      <TopNav />
      <div className="mx-auto max-w-screen-lg px-4 py-[100px]">
        <EventsOverview />
      </div>
    </main>
  );
}
