// reviewRoutes.js

const express = require('express');
const reviewController = require('../controllers/reviewController');
const router = express.Router();

// Route to search for courses
router.get('/reviews', reviewController.reviews);

// Route to retrieve courses
router.get('/getCourse', reviewController.getCourses);

// Route to retrieve all reviews for a specific course
router.get('/reviews/:cname', reviewController.courseReview);

// Route to report a review
router.post('/report/:reviewId', reviewController.reportReview);

module.exports = router;