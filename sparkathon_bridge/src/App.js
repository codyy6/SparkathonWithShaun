import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./pages/home/home";
import Landing from "./pages/landing/landing"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} /> 
        <Route path="/home" element={<Home />} /> 
      </Routes>
    </Router>
  );
}

export default App;
