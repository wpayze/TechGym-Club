import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "./index.scss";
import { MembersProvider } from "./contexts/MembersContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <MembersProvider>
    <App />
  </MembersProvider>
);
