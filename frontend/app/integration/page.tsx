import TopNav from "@/components/TopNav";

export default async function Integration() {
  const sites = ["My site", "My other site", "My third site"];

  return (
    <main>
      <TopNav sites={sites} />
      <div className="mx-auto max-w-screen-lg px-4 py-[100px]">
        <h1>Integration page</h1>
      </div>
    </main>
  );
}
