//loginSignupController.js
const express = require('express');
const router = express.Router();
const passport = require('passport');
const path = require('path');
const databaseModules = require('./database/databaseModules');


const db = databaseModules;



// create an account
const createUser = (req, res) => {
    db.createUser(req,res);
}

// check if username is valid and not taken
const checkUsername = (req, res) => {
    db.checkUsername(req,res);
}

// check if is email is valid and not taken
const checkEmail = (req, res) => {
    db.checkEmail(req,res);
}

// verify the password
const verifyPassword = (email,password,done) => {
    db.verifyPassword(email,password,done);
}

// get the users account
const getUserData = (uname,done) => {
    db.getUserData(uname,done);
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
        res.json({ uname: req.user.uname, email: req.user.email, suspended: req.user.suspended, role: req.user.role });
    } 
    else 
    {
        // User is not logged in
        res.status(401).send('Not logged in');
    }
}


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


module.exports = 
{ 
    createUser,
    checkUsername,
    checkEmail,
    verifyPassword,
    getUserData,
    account,
    userLoggedIn,
    login,
    logout
}