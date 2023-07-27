import "./App.css";
import {Route, Routes } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import VerifyOTP from "./pages/VerifyOTP"
import Dashboard from "./pages/Dashboard";
import UpdatedDetails from "./pages/UpdatedDetails"

function App() {

  return (
   <div className="w-screen min-h-screen bg-white flex flex-col">
    <Routes>
      <Route path="/" element={<LandingPage/>} />
      <Route path="signup" element={<Signup/>} />
      <Route path="verify-otp" element={<VerifyOTP/>} />
      <Route path="login" element={<Login/>} />
      <Route path="/dashboard" element={<Dashboard/>} />
      <Route path="/updateDetails" element={<UpdatedDetails/>} />
      
    </Routes>

   </div>
  );
}

export default App;
