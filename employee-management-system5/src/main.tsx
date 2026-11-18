import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./index.css";

import { EmployeeProvider } from "./context/EmployeeContext";
import { SettingsProvider } from "./context/SettingsContext";

ReactDOM.createRoot(
  document.getElementById("root")!
).render(
  <React.StrictMode>
    <SettingsProvider>
      <EmployeeProvider>
        <App />
      </EmployeeProvider>
    </SettingsProvider>
  </React.StrictMode>
);