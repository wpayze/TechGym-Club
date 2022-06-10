import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "./index.scss";

import { MembersProvider } from "./contexts/MembersContext";
import { AppContextProvider } from "./contexts/AppContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AppContextProvider>
    <MembersProvider>
      <App />
    </MembersProvider>
  </AppContextProvider>
);
