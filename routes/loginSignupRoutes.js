// loginSignuproutes.js

const express = require('express');
const loginSignupController = require('../controllers/loginSignupController');
const router = express.Router();

// Route to create a new user
router.post('/createUser', loginSignupController.createUser);

// Route to check if a username is valid
router.post('/checkUsername', loginSignupController.checkUsername);

// Route to check if an email is valid
router.post('/checkEmail', loginSignupController.checkEmail);

// Route to verify the password
router.get('verifyPassword', loginSignupController.verifyPassword);

// Route to get the user's account
router.get('getUserData', loginSignupController.getUserData);

// Route to redirect user to their appropriate account page
router.get('/account', loginSignupController.account);

// Route to determine if the user is logged in
router.get('/user', loginSignupController.userLoggedIn);

// Route to log in to the account
router.post('/login', loginSignupController.login);

// Route to log out of the account
router.get('/logout', loginSignupController.logout);

module.exports = router;