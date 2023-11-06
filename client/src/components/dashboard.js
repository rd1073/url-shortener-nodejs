import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './dashboard.css';
import Axios from "axios";
 
 const Dashboard = ({ username }) => {
    const [originalURL, setOriginalURL] = useState("");
    const [shortenedURL, setShortenedURL] = useState("");
    const [urls, setUrls] = useState([]);
    const [customAlias, setCustomAlias] = useState("");
    const [loading, setLoading] = useState(true);

    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
      Axios.get(`http://localhost:4000/urls/${username}`)
        .then((response) => {
          setUrls(response.data.urls);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Failed to fetch URLs:", error);
          setLoading(false);
        });
    }, [username]);

    const handleCustomURL = async () => {
      try {
        // Send a POST request to your server to create a custom shortened URL and save it to the user's record
        const response = await Axios.post('http://localhost:4000/custom-shorten', {
          username: username, // Pass the username to the server
          originalURL: originalURL, // You should define originalURL in your component state.
          customAlias: customAlias, // The custom alias provided by the user
        });
    
        if (response.status === 200) {
          // If the custom URL was successfully created, you can do something with the response if needed.
          // For example, you can show the custom shortened URL to the user.
          const shortenedURL = response.data.shortenedURL;
          setShortenedURL(shortenedURL);
          // Add the shortened URL to the list of URLs
          setUrls([...urls, { originalURL, shortenedURL: shortenedURL }]);
        } else {
          console.error('Custom URL creation failed. Server returned an error.');
        }
      } catch (error) {
        console.error('Custom URL creation failed:', error);
      }
    };
    


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
    <div className="dashboard-container">
       
         
        
      <h1 className="dashboard-title">Welcome, {username}!</h1>
      <h1 className="dashboard-title">URL Shortener</h1>
    

      <input
      className="dashboard-input"
        type="text"
        placeholder="Enter the original URL"
        value={originalURL}
        onChange={(e) => setOriginalURL(e.target.value)}
      />
              <button className="dashboard-button" onClick={handleShortenURL}>Shorten URL</button>
      
              <input
  className="dashboard-input"
  type="text"
  placeholder="Custom Alias (optional)"
  value={customAlias}
  onChange={(e) => setCustomAlias(e.target.value)}
/>
<button className="dashboard-button" onClick={handleCustomURL}>Create Custom URL</button>

              
      <button className="dashboard-button" onClick={handleLogout}>Logout</button>
      <button
  className="dashboard-button"
  onClick={() => setShowAll(!showAll)}
>
  {showAll ? "Hide All" : "Show All"}
</button>

      {/* Add content for the dashboard here */}
      {/* Display the list of URLs */}
      {urls.length > 0 && (
          <div>
            <h2 className="dashboard-title">All URLs:</h2>
            <p>
              Original URL: {urls[urls.length - 1].originalURL}
              <br />
              Shortened URL:{" "}
              <a href={urls[urls.length - 1].originalURL} target="_blank" rel="noopener noreferrer"  className="dashboard-link">
                {urls[urls.length - 1].shortenedURL}
              </a>
            </p>
          </div>
        )}

{showAll && (
  <div>
    <h2 className="dashboard-title">All URLs:</h2>
    <ul>
      {urls.map((url, index) => (
        <li key={index}>
          Original URL: {url.originalURL}
          <br />
          Shortened URL:{" "}
          <a
            href={url.originalURL}
            target="_blank"
            rel="noopener noreferrer"
            className="dashboard-link"
          >
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
