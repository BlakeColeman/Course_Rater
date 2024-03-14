const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const router = express.Router();
const path = require('path');
const flash = require('connect-flash');
const courseDatabase = require('../../database/databaseModules')

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
    return courseDatabase.verifyPassword(email,password,done);
}));

// Configure Passport serialization
passport.serializeUser((user, done) => {
  // Serialize the username
  done(null, user.uname); 
});

// Configure Passport deserialization
passport.deserializeUser((uname, done) => {
  // Deserialize the user based on the username
  courseDatabase.getUserData(uname,done);
});



// Login route
router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) 
        {
            return res.status(500).json({ success: false, message: 'An error occurred. Please try again later.' });
        }
        if (!user) 
        {
            return res.status(401).json({ success: false, message: info.message });
        }
        req.logIn(user, (err) => {
            if (err) 
            {
                return res.status(500).json({ success: false, message: 'An error occurred. Please try again later.' });
            }
            // If authentication succeeds, return success and redirect URL
            return res.status(200).json({ success: true, redirectURL: '/index' });
        });
    })(req, res, next);
});


// Logout route
router.get('/logout', (req, res) => {
    req.logout(() => {
        res.redirect('/index');
    });
});


module.exports = router;
