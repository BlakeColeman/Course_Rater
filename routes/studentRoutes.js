// studentRoutes.js

const express = require('express');
const studentController = require('../controllers/studentController');
const router = express.Router();

// Retrives courses
router.get('/getCourse', studentController.getCourses);

// show all the reviews by a user in their account page
router.get('/userReviews', studentController.userReviews);

// Edit a review
router.post('/editReview', studentController.editReview);

module.exports = router;