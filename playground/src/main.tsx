import * as React from "react";
import "./index.css";
import * as ReactDOM from "react-dom/client";
import { App } from "./App";
import { UseDataDemo } from "@app/UseDataDemo";
import { ListerProviderDemo } from "@app/ListerProviderDemo";



ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);