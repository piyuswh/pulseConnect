import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Navbar1 from "./Components/Navbar1";
import Login1 from "./Components/Login1";
import About from "./Components/About";
import Home from "./Components/Home";

export default function App() {
  return (
    <>
      <Navbar1 />
      
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Login />} />
        <Route path="/login" element={<Login1 />} />
        <Route path="/about" element={<About/>}/>
        <Route path='/home' element={<Home/>}/>
      </Routes>
    </>
  );
}
