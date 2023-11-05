import React, { useState } from "react";
import Axios from "axios";


function Url({username}) {
    const [originalURL, setOriginalURL] = useState("");
    const [shortenedURL, setShortenedURL] = useState("");
    const handleShortenURL = () => {
        Axios({
          method: "POST",
          data: {
            username:username,
            originalURL: originalURL, // You should define originalURL in your component state.
          },
          withCredentials: true,
          url: "http://localhost:4000/shorten", // Replace with your actual API endpoint.
        })
          .then((res) => {
            // Handle the response, e.g., set the shortened URL in your component state.
            const shortenedURL = res.data.shortenedURL;
            setShortenedURL(shortenedURL); // Assuming you're using React state.
          })
          .catch((error) => {
            console.error("URL shortening failed:", error);
            // Handle the error, e.g., show an error message to the user.
          });
      };
      

    
      
       
/*
      const handleShortenURL = async () => {
        
        try {
          const response = await Axios.post("http://localhost:4000/shorten", {
            username, // Pass the username to the server
            originalURL,
          });
    
          if (response.status === 200) {
            setShortenedURL(response.data.shortenedURL);
            // You can update the UI to display the shortened URL here
          } else {
            console.error("URL shortening failed.");
          }
        } catch (error) {
          console.error("URL shortening failed:", error);
        }
      };*/
  

  return (
    <div>
      <h1>URL Shortener</h1>
      <div>Hello, {username}!</div>

      <input
        type="text"
        placeholder="Enter the original URL"
        value={originalURL}
        onChange={(e) => setOriginalURL(e.target.value)}
      />
              <button onClick={handleShortenURL}>Shorten URL</button>

        


       
    </div>
  );
}

export default Url;
