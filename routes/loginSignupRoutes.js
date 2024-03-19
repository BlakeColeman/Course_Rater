// loginSignuproutes.js

const express = require('express');
const loginSignupController = require('../controllers/loginSignupController');
const router = express.Router();

// Create new user
router.post('/createUser', loginSignupController.createUser);

// check username is valid
router.post('/checkUsername', loginSignupController.checkUsername);

// check if email is valid
router.post('/checkEmail', loginSignupController.checkEmail);

// verify the password
router.get('verifyPassword', loginSignupController.verifyPassword);

// get the users account
router.get('getUserData', loginSignupController.getUserData);

// take user to appropriate account
router.get('/account', loginSignupController.account);

// Determines if the user is logged in
router.get('/user', loginSignupController.userLoggedIn);

// login to account
router.post('/login', loginSignupController.login);

// log out of account
router.get('/logout', loginSignupController.logout);

module.exports = router;