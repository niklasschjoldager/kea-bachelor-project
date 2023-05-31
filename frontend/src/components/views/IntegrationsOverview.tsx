"use client";
import { useSession } from "next-auth/react";
import Card from "../ui/Card";
import CardDivider from "../ui/CardDivider";
import CodeBlock from "../ui/CodeBlock";

const IntegrationsOverview = () => {
  const { data: session } = useSession();
  const userId = session?.user.id;

  const integrationStep = [
    {
      title: "Add the script tag",
      subtitle: "Add this code to the <head> section of your website's HTML",
      text: "Click on the copy code button. Then paste the code into the <head> section of your website. If the event widget will be displayed on multiple pages, add it globally to your website's <head> tag. Else for performance reasons, we recommend only adding it to that particular page.",
      code: `<!-- Eventel script -->
<link rel="stylesheet" href="https://bachelor-project-integration.vercel.app/assets/index.css">
<script async src="https://bachelor-project-integration.vercel.app/assets/index.js"></script>
<!-- End Eventel script  -->`,
    },
    {
      title: "Display the events on your page",
      subtitle: "Add this code to the <body> section of your website's HTML",
      text: "Click on the copy code button. Then paste the code into the <body> section of your website, on the page you want your events to be displayed. Refresh the page. Your events should be displayed if you have created any. That's it! You can add it on multiple pages if you like to.",
      code: `<!-- Eventel widget -->
<div id="eventel-root" data-eventel-integration-id="${userId}"></div>
<!-- End Eventel widget -->`,
    },
  ];

  return (
    <div className="mt-12 flex flex-col gap-8">
      {integrationStep.map((step, i) => {
        return (
          <Card key={i}>
            <div className="flex items-center gap-3">
              <div className="rounded-sm flex h-9 w-9 items-center justify-center bg-paynes-gray text-h2 text-white">
                {i + 1}
              </div>
              <h2 className="text-h2">{step.title}</h2>
            </div>
            <CardDivider />
            <h3 className="text-h3 font-semibold">{step.subtitle}</h3>
            <p className="max-w-prose">{step.text}</p>
            <CodeBlock>{step.code}</CodeBlock>
          </Card>
        );
      })}
    </div>
  );
};

export default IntegrationsOverview;
