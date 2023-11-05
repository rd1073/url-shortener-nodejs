const { User} = require("./user");

const bcrypt = require('bcrypt');
/*
const localStrategy = require("passport-local").Strategy;

module.exports = function (passport) {
  passport.use(
    new localStrategy((username, password, done) => {
      User.findOne({ username: username }, (err, user) => {
        if (err) throw err;
        if (!user) return done(null, false);
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) throw err;
          if (result === true) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        });
      });
    })
  );

  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });
  passport.deserializeUser((id, cb) => {
    User.findOne({ _id: id }, (err, user) => {
      const userInformation = {
        username: user.username,
      };
      cb(err, userInformation);
    });
  });
};
*/

const localStrategy = require("passport-local").Strategy;
 
module.exports = function (passport) {
  passport.use(
    new localStrategy(async (username, password, done) => {
      try {
        const user = await User.findOne({ username: username });

        if (!user) {
          return done(null, false);
        }

        const result = await bcrypt.compare(password, user.password);

        if (result === true) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (err) {
        return done(err);
      }
    })
  );

  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });

  passport.deserializeUser(async (id, cb) => {
    try {
      const user = await User.findOne({ _id: id });

      if (user) {
        const userInformation = {
          username: user.username,
        };
        cb(null, userInformation);
      } else {
        cb("User not found");
      }
    } catch (err) {
      cb(err);
    }
  });
};



