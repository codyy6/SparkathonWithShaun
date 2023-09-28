import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./pages/home/home";
import Landing from "./pages/landing/landing"
import Survey from "./pages/survey/survey"
import Complete from "./pages/complete/complete"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} /> 
        <Route path="/home" element={<Home />} /> 
        <Route path="/survey" element={<Survey />} />
        <Route path="/complete" element={<Complete />} />
      </Routes>
    </Router>
  );
}

export default App;
