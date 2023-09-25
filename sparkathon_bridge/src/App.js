import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from "./pages/home";
import NavigationBar from './components/topNav.js'

function App() {
  return (
    <Router>
      <NavigationBar/>
      <Routes>
        <Route path="/" element={<Main />} /> 
      </Routes>
    </Router>
  );
}

export default App;
