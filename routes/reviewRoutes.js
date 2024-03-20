// reviewRoutes.js

const express = require('express');
const reviewController = require('../controllers/reviewController');
const router = express.Router();

// search for a course
router.get('/reviews', reviewController.reviews);

// Retrives courses
router.get('/getCourse', reviewController.getCourses);

// all reviews for a course that was searched
router.get('/reviews/:cname', reviewController.courseReview);

// report a review
router.post('/report/:reviewId', reviewController.reportReview);

module.exports = router;