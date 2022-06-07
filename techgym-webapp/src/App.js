import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import PageNotFound from "./components/PageNotFound";
import Members from "./components/Members";
import Memberships from "./components/Memberships";
import Home from "./components/Home";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";

import Protected from "./components/Auth/Protected";

function App() {

  

  return (
    <Router>
      <div id="app">
        <NavBar />
        <Routes>
          <Route path="/" element={ <Home /> } />
          <Route path="members" element={ <Protected> <Members /> </Protected> } />
          <Route path="memberships" element={<Protected> <Memberships /> </Protected>} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
