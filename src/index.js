import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Toggle from "./context/Toggle";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Toggle>
        <App />
      </Toggle>
    </BrowserRouter>
  </React.StrictMode>
);
