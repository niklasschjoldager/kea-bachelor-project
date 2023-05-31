import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

function init() {
  const root = document.getElementById("eventel-root") as HTMLElement;

  if (!root) {
    return console.error(
      "Eventel Integration: Cannot find Eventel root. Did you forget to add it to your page? See the integration documentation (https://kea-bachelor-project.vercel.app/integration) for more info."
    );
  }

  const integrationId = root.getAttribute("data-eventel-integration-id");

  if (!integrationId) {
    return console.error(
      "Eventel Integration: Cannot find integration ID from Eventel root. Did you forget to add it to your page? See the integration documentation (https://kea-bachelor-project.vercel.app/integration) for more info."
    );
  }

  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <App integrationId={integrationId} />
    </React.StrictMode>
  );
}

init();
