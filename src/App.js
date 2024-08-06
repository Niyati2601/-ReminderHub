import React from "react";
import Home from "../src/Components/Home/Home";
import "./App.css";
import Navbar from "../src/Components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom"; // Corrected import
import Reminder from "../src/Components/Reminder/Reminder";
import Register from "../src/Components/Register/Register";
import Login from "../src/Components/Login/Login";
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
    <Toaster />
    <div className="App" >
      <Navbar />
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reminder" element={<Reminder />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </>
    </div>
    </>
  );
}

export default App;
