const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/user')

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK
},
  function (accessToken, refreshToken, profile, cb) {
    User.find({ 'googleId': profile.id }, function (err, user) {
      if (err) {
      return cb(err);
      }
      if (user) {
        return cb(null, user);
      } else {
        var newUser = new User({
          name: profile.displayName,
          email: profile.emails[0].value,
          googleId: profile.id
        });
        newUser.save(function (err) {
          if (err) return cb(err);
          return cb(null, newUser);
        });
      }
    });
  } 
));

passport.serializeUser(function (user, done) {
  done(null, user[0].googleId);
});

passport.deserializeUser(function (googleId, done) {
  User.find({ 'googleId': googleId }, function (err, user) {
    done(err, user[0]);
  });
});