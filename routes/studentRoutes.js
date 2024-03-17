// studentRoutes.js

const express = require('express');
const studentController = require('../controllers/studentController');
const router = express.Router();

// show all the reviews by a user in their account page
router.get('/userReviews', studentController.userReviews);

// details for a singular review on the edit review page
router.get('/reviewDetails/:id', studentController.reviewDetails);

// Create a review
router.post('/createReview', studentController.createReview);

// Edit a review
router.post('/editReview', studentController.editReview);

// delete a review on the edit review page
router.delete('/deleteReview/:id', studentController.deleteReview);

module.exports = router;