import IntegrationsOverview from "@/components/views/IntegrationsOverview";

export default async function Integration() {
  return (
    <>
      <h1 className="mb-3 text-h1">Integration guide</h1>
      <p className="max-w-prose">
        Add our events widget to your website in only 2 minutes, with our short
        and simple integration guide.
      </p>
      <IntegrationsOverview />
    </>
  );
}
