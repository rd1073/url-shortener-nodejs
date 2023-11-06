 
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

// Add this route for URL shortening
/*app.post("/shorten", (req, res) => {
  
  const { username, originalURL } = req.body;

  console.log("User:", req.user);

  const user = req.user; // Get the authenticated user from the session

  // Generate a unique shortened URL using shortid
  const shortenedURL = shortid.generate();

  // Update the user's record with the shortened URL
  user.urls.push({ originalURL, shortURL: shortenedURL });

  user.save((err) => {
    if (err) {
      console.error("URL save failed:", err);
      res.status(500).send("URL save failed");
    } else {
      res.json({ shortenedURL });
    }
  });
});*/
/*
app.post("/shorten", async (req, res) => {
  const { username, originalURL } = req.body;

  // Implement the logic to generate a unique shortened URL (you can use shortid)
  const shortenedURL = shortid.generate();


  // Save the original and shortened URLs to the user's document in the database
  try {
    // Find the user by username
    const user = await User.findOne({ username: username });

    if (!user) {
      return res.status(404).send("User not found");
    }

    // Push the original and shortened URLs to the user's record
    user.urls.push({ originalURL, shortenedURL });
    
    // Save the updated user document
    await user.save();

    res.status(200).json({ shortenedURL });
  } catch (err) {
    console.error("Error saving shortened URL:", err);
    res.status(500).send("URL shortening and saving failed.");
  }

});*/

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

/*
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const bcrypt = require("bcrypt");
const User = require("./user"); // Create a User model for MongoDB
const app = express();

// Load environment variables from a .env file
//require("dotenv").config();

 
// Express middleware setup
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "abcd",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Passport Local strategy
passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      if (err) return done(err);
      if (!user) return done(null, false, { message: "Incorrect username." });
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) return done(err);
        if (result === true) return done(null, user);
        return done(null, false, { message: "Incorrect password." });
      });
    });
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

// Routes
app.get("/", (req, res) => {
  res.render("login");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      username: req.body.username,
      password: hashedPassword,
    });
    await user.save();
    res.redirect("/login");
  } catch (error) {
    console.error(error);
    res.redirect("/register");
  }
});

app.get("/dashboard", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("dashboard", { user: req.user.username });
  } else {
    res.redirect("/login");
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

*/