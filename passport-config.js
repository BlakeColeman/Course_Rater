// passport-config.js
// For user authentication

const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const router = express.Router();
const path = require('path');
const flash = require('connect-flash');
const loginSignupController = require('./controllers/loginSignupController')

// Session middleware
router.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));

router.use(flash());
router.use(passport.initialize());
router.use(passport.session());

// Configure Passport
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'pword'
}, (email, password, done) => {
    // Check if the user exists and passwords match
    return loginSignupController.verifyPassword(email,password,done);
}));

// Configure Passport serialization
passport.serializeUser((user, done) => {
  // Serialize the username
  done(null, user.uname); 
});

// Configure Passport deserialization
passport.deserializeUser((uname, done) => {
  // Deserialize the user based on the username
  loginSignupController.getUserData(uname,done);
});

module.exports = router;


