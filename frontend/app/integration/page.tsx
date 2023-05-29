import TopNav from "@/components/common/TopNav";
import IntegrationsOverview from "@/components/views/IntegrationsOverview";

export default async function Integration() {
  return (
    <main>
      <TopNav />
      <div className="mx-auto max-w-screen-lg px-4 py-[100px]">
        <h1 className="text-h1 mb-3">Integration guide</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
        <IntegrationsOverview />
      </div>
    </main>
  );
}
