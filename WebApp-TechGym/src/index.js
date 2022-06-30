import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "./index.scss";

import { MembersProvider } from "./contexts/MembersContext";
import { AppContextProvider } from "./contexts/AppContext";
import { BranchProvider } from "./contexts/BranchContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AppContextProvider>
    <MembersProvider>
      <BranchProvider>
        <App />
      </BranchProvider>
    </MembersProvider>
  </AppContextProvider>
);
