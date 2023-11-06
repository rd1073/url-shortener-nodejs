 

import React, { useState } from "react";
import Axios from "axios";
import Dashboard from "./dashboard";
import './login.css';



function Login() {
  
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState(null);

    
  const login = () => {

    Axios({
      method: "POST",
      data: {
        username: loginUsername,
        password: loginPassword,
      },
      withCredentials: true,
      url: "http://localhost:4000/login",
    }).then((res) =>{
        setUser(res.data);
        console.log(res);
    }).catch((error) => console.error(error));

  };
   /*
  return (
    <div className="login-container" >
        {user ? (
      <><Dashboard username={user.username} /></>

    ) : (

      <><div>
            <h1>Login</h1>
            <form className="login-form">
            <input
              placeholder="username"
              onChange={(e) => setLoginUsername(e.target.value)} />
            <input
              placeholder="password"
              onChange={(e) => setLoginPassword(e.target.value)} />
            <button className="login-button" onClick={login}>Submit</button>
            </form>
            
            <div className="register-link">
              Not a user? <a href="/register">Register now</a>
            </div></>
      </div>
    )}

       
    </div>
  );
}*/
return (
  <div className="login-container">
      {user ? (
    <><Dashboard username={user.username} /></>

  ) : (

    <div>
      <h1>Login</h1>
      <div className="login-form">
      <input
      className="login-input"
        placeholder="username"
        onChange={(e) => setLoginUsername(e.target.value)}
      />
      <input
      className="login-input"
        placeholder="password"
        onChange={(e) => setLoginPassword(e.target.value)}
      />
      <button className="login-button" onClick={login}>Submit</button>
      </div>
      <div className="register-link">
          Not a user? <a href="/signup">Register now</a>
        </div>
    </div>
  )}

     
  </div>
);
}

export default Login;