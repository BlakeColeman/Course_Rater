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

// login to account
//router.post('/login', passport.authenticate('local'), loginSignupController.login);

// logout of account
//router.get('/logout', loginSignupController.logout);

module.exports = router;