/*import React, { useState } from "react";
import "./App.css";

import axios from "axios"; // Import axios here


function App() {
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const register = () => {
    console.log("Register button clicked"); // Add this line

    axios.post("http://localhost:4000/register", {
        username: registerUsername,
        password: registerPassword,
      })
      .then((res) => console.log(res))
      .catch((error) => console.error(error));
  };

  const login = () => {
    axios.post("http://localhost:4000/login", {
        username: loginUsername,
        password: loginPassword,
      })
      .then((res) => console.log(res))
      .catch((error) => console.error(error));
  };
      
   
  return (
    <div className="App">
      <div>
        <h1>Register</h1>
        <input
          placeholder="username"
          onChange={(e) => setRegisterUsername(e.target.value)}
        />
        <input
          placeholder="password"
          onChange={(e) => setRegisterPassword(e.target.value)}
        />
        <button onClick={register} type="button">Register</button>
      </div>

      <div>
        <h1>Login</h1>
        <input
          placeholder="username"
          onChange={(e) => setLoginUsername(e.target.value)}
        />
        <input
          placeholder="password"
          onChange={(e) => setLoginPassword(e.target.value)}
        />
        <button onClick={login} type="button">Login</button>
      </div>

       
    </div>
  );
}

export default App;*/

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