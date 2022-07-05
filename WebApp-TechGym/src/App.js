import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import PageNotFound from "./components/PageNotFound";

import Members from "./components/Members/Members";
import AddEditMember from "./components/Members/AddEditMember";

import Trainers from "./pages/Trainers/Trainers";
import AddEditTrainer from "./pages/Trainers/AddEditTrainer";

import Home from "./components/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

import Protected from "./pages/Auth/Protected";
import Settings from "./pages/Settings/Settings";

import 'react-toastify/dist/ReactToastify.min.css';

function App() {
  return (
    <Router>
      <div id="app" className="has-background-light">
        <NavBar />
        <Routes>
          <Route path="/" element={ <Home /> } />
          
          <Route path="members" element={ <Protected> <Members /> </Protected> } />
          <Route path="members/create" element={ <Protected> <AddEditMember /> </Protected> } />
          <Route path="members/edit/:id" element={ <Protected> <AddEditMember /> </Protected> } />

          <Route path="trainers" element={ <Protected> <Trainers /> </Protected> } />
          <Route path="trainers/create" element={ <Protected> <AddEditTrainer /> </Protected> } />
          <Route path="trainers/edit/:id" element={ <Protected> <AddEditTrainer /> </Protected> } />

          <Route path="settings" element={<Protected> <Settings /> </Protected>} />
  
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
