const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const router = express.Router();
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const flash = require('connect-flash');

// Connecting to the database
let db = new sqlite3.Database('./public/database/UofRCourseRater', (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Login Router');
    }
});

// Configure Passport
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'pword'
}, (email, password, done) => {
    // Check if the user exists and passwords match
    db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
      if (err) {
        console.error(err); // Log the error
        return done(err);
       } 
        if (!row) return done(null, false, { message: 'Incorrect email.' });
        if (row.pword !== password) return done(null, false, { message: 'Incorrect password.' });
        return done(null, row);
    });
}));

// Configure Passport serialization
passport.serializeUser((user, done) => {
  // Serialize the username instead of user.id
  done(null, user.uname); 
});

// Configure Passport deserialization
passport.deserializeUser((uname, done) => {
  // Deserialize the user based on the username
  db.get('SELECT * FROM users WHERE uname = ?', [uname], (err, user) => {
      done(err, user);
  });
});

// Session middleware
router.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));

router.use(flash());
router.use(passport.initialize());
router.use(passport.session());


// Login route
router.post('/login', passport.authenticate('local', {
    successRedirect: '/index2',
    failureRedirect: '/failure',
    failureFlash: true
}));

// Logout route
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});



module.exports = router;
