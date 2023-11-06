 
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const { User} = require("./user");
const shortid = require("shortid");
const bcrypt = require("bcrypt");
const session = require("express-session");
const bodyParser = require("body-parser");
const app = express();

//----------------------------------------- END OF IMPORTS---------------------------------------------------
 
// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    // <-- location of the react app were connecting to
    credentials: true,
  })
);

app.use(
  session({
    secret: "abcd",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);

//----------------------------------------- END OF MIDDLEWARE---------------------------------------------------

// Routes 
app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.send("No User Exists");
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        
        console.log(req.user);
        res.json({ username: user.username });

      });
    } 
  })(req, res, next);
});
  


app.post("/register", (req, res) => {
  User.findOne({ username: req.body.username })
    .then(doc => {
      if (doc) {
        res.send("User Already Exists");
      } else {
        bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
          if (err) throw err;

          const newUser = new User({
            username: req.body.username,
            password: hashedPassword,
          });

          newUser.save()
            .then(() => {
              res.send("User Created");
            })
            .catch(error => {
              res.json({ message: "User Created", registrationSuccess: true });

            });
        });
      }
    })
    .catch(err => {
      res.status(500).send("Server error");
    });
});

app.post("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      res.status(500).send("Logout failed");
    } else {
      res.status(200).send("Logout successful");
    }
  });
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next(); // User is authenticated, proceed to the next middleware
  }
  res.status(401).send('Not authenticated'); // User is not authenticated
}

 

app.post("/shorten", (req, res) => {
  const { username, originalURL } = req.body;

  // Assuming you have the logic to generate a unique shortened URL here
  
// Update the user's record in the database with the shortened URL
User.findOne({ username: username })
  .then((user) => {
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Assuming you have the logic to generate a unique shortened URL here
    const shortenedURL = shortid.generate();


    user.urls.push({ originalURL, shortURL: shortenedURL });

    return user.save();
  })
  .then((updatedUser) => {
    // Respond with the shortened URL
    res.json({ shortenedURL: updatedUser.urls[updatedUser.urls.length - 1].shortURL });
  })
  .catch((err) => {
    console.error("URL shortening and database update failed:", err);
    res.status(500).send("URL shortening and database update failed.");
  });

  

  // Update the user's record in the database with the shortened URL
  
});


app.post("/custom-shorten", (req, res) => {
  const { username, originalURL, customAlias } = req.body;
  User.findOne({ username: username })
  .then((user) => {
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const shortenedURL = customAlias;


    user.urls.push({ originalURL, shortURL: shortenedURL });

    return user.save();
  })
  .then((updatedUser) => {
    // Respond with the shortened URL
    res.json({ shortenedURL: updatedUser.urls[updatedUser.urls.length - 1].shortURL });
  })
  .catch((err) => {
    console.error("URL shortening and database update failed:", err);
    res.status(500).send("URL shortening and database update failed.");
  });


  // Update the user's record in the database with the shortened URL
});

app.get("/urls/:username", (req, res) => {
  const username = req.params.username;

  // Find all URLs associated with the given username in your database
  URL.find({ username: username })
    .then((urls) => {
      // Send the list of URLs as a JSON response
      res.json({ urls });
    })
    .catch((error) => {
      console.error("Failed to fetch URLs:", error);
      res.status(500).json({ error: "Failed to fetch URLs" });
    });
});

app.get('/dashboard', ensureAuthenticated, (req, res) => {
  // Here, you can access the authenticated user's data using req.user
  const authenticatedUsername = req.user.username;

  // You can render the dashboard template or send data as needed
  res.render('dashboard', { username: authenticatedUsername });
});




//----------------------------------------- END OF ROUTES---------------------------------------------------
//Start Server
app.listen(4000, () => {
  console.log("Server Has Started");
});
 