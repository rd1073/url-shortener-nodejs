 

import React, { useState } from "react";
import "./App.css";
import Axios from "axios";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./components/login";
import Signup from "./components/signup";
 

function App() {
  return (
    <div className="App" >
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
 
 
            

 


          </Routes>
        </div>
      </Router>

     </div>
  );
}

export default App;