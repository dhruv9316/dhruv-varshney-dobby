import "./App.css";
import {Route, Routes } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Dashboard from "./pages/Dashboard";

function App() {

  return (
   <div className="w-[98vw] min-h-screen bg-white flex flex-col mx-auto overflow-x-hidden px-3">
    <Routes>

      <Route path="/" element={<LandingPage/>} />
      <Route path="signup" element={<Signup/>} />
      <Route path="login" element={<Login/>} />
      <Route path="/dashboard" element={<Dashboard/>} />

    </Routes>

   </div>
  );
}

export default App;
