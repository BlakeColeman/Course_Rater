//loginSignupController.js

const sqlite3 = require('sqlite3').verbose(); 
const express = require('express');
const router = express.Router();
const path = require('path');

// connect to the database
function connectToDatabase() {
    return new sqlite3.Database('./database/UofRCourseRater', (err) => {
        if (err) {
            console.error(err.message);
        }
    });
}

// create an account
const createUser = (req, res) => {
    const db = connectToDatabase();
    
    // SignupForm(req.body);
    console.log(req.body)
    db.run('INSERT INTO users(uname,email,pword) VALUES(?,?,?)', [req.body.uname,req.body.email, req.body.pword], function(err) {
        if (err) 
        {
            return console.log(err.message);
        }
        console.log("New user has been added");
        res.sendFile(path.join(__dirname, '../','public/view', 'login.html'));
    });
    db.close()
}

// check if username is valid and not taken
const checkUsername = (req, res) => {
    const db = connectToDatabase();

    const {uname} = req.body;
    console.log("Checking uname:",uname,"for availability");
    var sql = 'SELECT * FROM users WHERE uname = ?';
    // Check if the username already exists in the database
    db.all(sql, [uname], (err, rows)=> 
    {
        if (err) {
          console.error(err.message);
          res.status(500).send('Internal Server Error');
          return;
        }
        if (rows.length!=0) {
          // Username already exists, send a 400 Bad Request response
          res.status(400).send('Username already exists');
          return;
        } else {
          // Username doesn't exist, send a 200 OK response
          res.status(200).send('Username available');
          return;
        }
    });
    db.close()
}

// check if is email is valid and not taken
const checkEmail = (req, res) => {
    const db = connectToDatabase();

    const {email} = req.body;
    console.log("checking Email",email,"for availability");
    var sql ='SELECT * FROM users WHERE email = ?';
    db.all(sql,[email],(err, rows) =>
    {
        if (err) 
        {
          console.error(err.message);
          res.status(500).send('internal Server Error');
          return;
        }
        if (rows.length != 0) 
        {
          //Email already registered, send a 400 Bad Request response
          res.status(400).send('Email already in use');
        }
        else
        {
          //Email not registered, send a 200 OK response
          res.status(200).send('Email available');
        }
    })
    db.close()
}

// verify the password
const verifyPassword = (email,password,done) => {
    const db = connectToDatabase();

    db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
        if (err) {
            console.error(err);
            return done(err);
        } 
        if (!row) {
            return done(null, false, { message: 'Incorrect email.' });
        }
        if (row.pword !== password) {
            return done(null, false, { message: 'Incorrect password.' });
        }

        return done(null, row);
    });
    db.close()
}

// get the users account
const getUserData = (uname,done) => {

  const db = connectToDatabase();

    db.get('SELECT * FROM users WHERE uname = ?', [uname], (err, user) => {
        done(err, user);
    });
db.close()
}

// Takes user to account info
const account = (req, res) => {
    // Check if the user is logged in
    if (!req.user) 
    {
        res.redirect('/login');
        return;
    }

    // Check the user's role
    if (req.user.role === 'admin') 
    {
        // Direct to the admin account page
        res.sendFile(path.join(__dirname, '../','public/view', 'adminAccount.html'));
    } 
    else if (!req.user.role) 
    {
        // Direct to the student account page is role is blank
        res.sendFile(path.join(__dirname, '../','public/view', 'studentAccount.html'));
    } 
    else 
    {
        res.status(404).send('Error handling account');
    }
}

// Determines if the user is logged in
const userLoggedIn = (req, res) => {
    if (req.user) 
    {
        // User is logged in, send user information
        res.json({ uname: req.user.uname, email: req.user.email, suspended: req.user.suspended });
    } 
    else 
    {
        // User is not logged in
        res.status(401).send('Not logged in');
    }
}

/*
// Login 
const login = (req, res, next) => {
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
}

// Logout
const logout = (req, res) => {
    req.logout(() => {
        res.redirect('/index');
    });
};
*/

module.exports = 
{ 
    createUser,
    checkUsername,
    checkEmail,
    verifyPassword,
    getUserData,
    account,
    userLoggedIn
}