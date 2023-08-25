import { OpenAPI } from "@awex-api";
import * as React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import reportWebVitals from "./reportWebVitals";
import { App } from "./app";
import { JWT_KEY } from "./config";

OpenAPI.TOKEN = JWT_KEY;

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <HelmetProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </HelmetProvider>
);

reportWebVitals();
