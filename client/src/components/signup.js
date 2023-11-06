 

import React, { useState } from "react";
import './signup.css';
import Axios from "axios";
import Dashboard from "./dashboard";
function Signup() {
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
 
  const register = () => {
    Axios({
      method: "POST",
      data: {
        username: registerUsername,
        password: registerPassword,
      },
      withCredentials: true,
      url: "http://localhost:4000/register",
    }).then((res) => {
      if (res.data.registrationSuccess) {
        // Redirect to the login component
        console.log("Redirecting to login...");

        window.location = '/login';
      }
    }) 
  };
   
   
  return (
    <div className="signup-container">
        
      <div>
        <h1 className="signup-title">Register</h1>
        <input
        className="signup-input"
          placeholder="username"
          onChange={(e) => setRegisterUsername(e.target.value)}
        />
        <input
                className="signup-input"

          placeholder="password"
          onChange={(e) => setRegisterPassword(e.target.value)}
        />
        <button         className="signup-button"
 onClick={register}>Submit</button>
      </div>

      <div className="login-link">
           <a href="/login">Login!!</a>
        </div>

  
    </div>
  );
}

export default Signup;