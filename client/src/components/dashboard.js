import React from "react";
import Axios from "axios";

const Dashboard = ({ username }) => {

    /*const handleLogout = async () => {
        try {
            Axios({
                method: "POST",
                url: "http://localhost:4000/logout",
              }).then((res) => console.log(res));
          // Send a POST request to your server to log the user out
           // Redirect the user to the login page (you can use react-router for this)
          window.location = '/login';
        } catch (error) {
          console.error('Logout failed:', error);
        }
      };*/

      const handleLogout = async () => {
        try {
          // Send a POST request to your server to log the user out
          const response = await Axios.post('http://localhost:4000/logout');
      
          if (response.status === 200) {
            // If the logout was successful, redirect the user to the login page
            window.location = '/login';
          } else {
            console.error('Logout failed. Server returned an error.');
          }
        } catch (error) {
          console.error('Logout failed:', error);
        }
      };
      

       
       

  return (
    <div>
      <h1>Welcome, {username}!</h1>
      <button onClick={handleLogout}>Logout</button>
      {/* Add content for the dashboard here */}
    </div>
  );
};

export default Dashboard;
