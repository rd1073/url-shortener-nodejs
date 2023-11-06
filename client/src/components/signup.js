 

import React, { useState } from "react";
import './signup.css';
import Axios from "axios";

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
    }).then((res) => console.log(res));
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

       

       
    </div>
  );
}

export default Signup;