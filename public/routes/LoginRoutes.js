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
        if (err) {
            return res.status(500).json({ success: false, message: 'An error occurred. Please try again later.' });
        }
        if (!user) {
            return res.status(401).json({ success: false, message: info.message });
        }
        req.logIn(user, (err) => {
            if (err) {
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

// router.post('/checkPassword', (req, res) => {
//     const { email, pword } = req.body;
//     console.log("Received email:", email);
//     console.log("Received password:", pword);

//     // Query the database to find a user with the provided email
//     var sql = 'SELECT * FROM users WHERE email = ?';
//     db.get(sql, [email], (err, row) => {
//         if (err) {
//             // Handle any errors
//             console.error(err.message);
//             res.status(500).send('Internal Server Error');
//             return;
//         }

//         if (!row) {
//             // If no user found with the provided email, send a 404 Not Found response
//             res.status(404).send('User not found');
//             return;
//         }

//         // Check if the provided password matches the stored password
//         if (row.pword !== pword) {
//             // If passwords don't match, send a 400 Bad Request response
//             res.status(400).send('Incorrect password');
//             return;
//         }

//         // If email and password match, send a 200 OK response
//         res.status(200).send('Password correct');
//     });
// });
module.exports = router;
