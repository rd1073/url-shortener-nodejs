 

import React, { useState } from "react";
import Axios from "axios";
import Dashboard from "./dashboard";
 



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
   
  return (
    <div >
        {user ? (
      <><Dashboard username={user.username} /></>

    ) : (

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
        <button onClick={login}>Submit</button>
      </div>
    )}

       
    </div>
  );
}

export default Login;