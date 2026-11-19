
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

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
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </EmployeeProvider>
    </SettingsProvider>
  </React.StrictMode>
);
