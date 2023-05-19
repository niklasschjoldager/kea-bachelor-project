import TopNav from "@/components/TopNav";

export default async function Integration() {
  const sites = ["My site", "My other site", "My third site"];
  const navElements = ["Events", "Integration"];

  return (
    <main>
      <TopNav sites={sites} navElements={navElements} />
      <div className="mx-auto max-w-screen-lg px-4 py-[100px]">
        <h1>Integration page</h1>
      </div>
    </main>
  );
}
