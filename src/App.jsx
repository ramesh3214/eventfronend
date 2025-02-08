import React from "react";
import Navbar from "./Component/Header/Navbar";
import Eventlist from "./Component/Dashboard/Eventlist";
import EventListingForm from "./Component/Dashboard/Eventlistingform";
import { Route, Routes } from "react-router-dom";
import Home from "./Component/Home/Home";
import RegistrationForm from "./Component/User/Authcontext/Registration";
import Signup from "./Component/User/Authcontext/Signup";

import Signin from "./Component/User/Authcontext/Signin";
import Dashboard from "./Component/User/Authcontext/Dashboard";
import BookingConfirmationPage from "./Component/Dashboard/BookingConfirmPage";
import './App.css';

function App() {
  return (
    <>
   
    <Navbar />
    
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/event" element={<Eventlist />} />
        <Route path="/eventform" element={<EventListingForm />} />
        <Route path="/registration" element={<RegistrationForm />} />
        <Route path="/signup" element={<Signup/>} />
          <Route path="/login" element={<Signin/>} />
          <Route path="/profile" element={<Dashboard/>} />
          <Route path="/booking-confirmation" element={<BookingConfirmationPage/>} />
      </Routes>
    </>
  );
}

export default App;
