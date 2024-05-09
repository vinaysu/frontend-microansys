import React from "react";
import RegistrationForm from "./RegistrationForm";
import Navbar from "./Navbar";
import { Routes, Route } from "react-router-dom";
import ExistedEnquiry from "./ExistedEnquiry";

const App = () => {
  return (
    <div>
      <Navbar />
      <hr></hr>
      <Routes>
        <Route path="/" element={<RegistrationForm />} />
        <Route path="/existed enquiry" element={<ExistedEnquiry />} />
      </Routes>
    </div>
  );
};

export default App;
