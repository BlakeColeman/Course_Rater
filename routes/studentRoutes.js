// studentRoutes.js

const express = require('express');
const studentController = require('../controllers/studentController');
const router = express.Router();

// Route to display all reviews by a user in their account page
router.get('/userReviews', studentController.userReviews);

// Route to retrieve details for a singular review on the edit review page
router.get('/reviewDetails/:id', studentController.reviewDetails);

// Route to create a new review
router.post('/createReview', studentController.createReview);

// Route to edit a review
router.post('/editReview', studentController.editReview);

// Route to delete a review on the edit review page
router.delete('/deleteReview/:id', studentController.deleteReview);

module.exports = router;