import React, { useState } from "react";
import Axios from "axios";
 const Dashboard = ({ username }) => {
    const [originalURL, setOriginalURL] = useState("");
    const [shortenedURL, setShortenedURL] = useState("");
    const [urls, setUrls] = useState([]);


    const handleShortenURL = async () => {
        try {
          // Send a POST request to your server to shorten the URL and save it to the user's record
          const response = await Axios.post('http://localhost:4000/shorten', {
            username: username, // Pass the username to the server
            originalURL: originalURL, // You should define originalURL in your component state.
          });
      
          if (response.status === 200) {
            // If the URL was successfully shortened, you can do something with the response if needed.
            // For example, you can show the shortened URL to the user.
            const shortenedURL = response.data.shortenedURL;
            setShortenedURL(shortenedURL);
            // Add the shortened URL to the list of URLs
           setUrls([...urls, { originalURL, shortenedURL: shortenedURL }]);
          } else {
            console.error('URL shortening failed. Server returned an error.');
          }
        } catch (error) {
          console.error('URL shortening failed:', error);
        }
      };
      

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
      <h1>URL Shortener</h1>
      <div>Hello, {username}!</div>

      <input
        type="text"
        placeholder="Enter the original URL"
        value={originalURL}
        onChange={(e) => setOriginalURL(e.target.value)}
      />
              <button onClick={handleShortenURL}>Shorten URL</button>
              
      <button onClick={handleLogout}>Logout</button>
      {/* Add content for the dashboard here */}
      {/* Display the list of URLs */}
      {urls.length > 0 && (
        <div>
          <h2>Your URLs:</h2>
          <ul>
            {urls.map((url, index) => (
              <li key={index}>
                Original URL: {url.originalURL}
                <br />
                Shortened URL:{" "}
                <a href={url.originalURL} target="_blank" rel="noopener noreferrer">
                  {url.shortenedURL}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

    </div>
  );
};

export default Dashboard;
