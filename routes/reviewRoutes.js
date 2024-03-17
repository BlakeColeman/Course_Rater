// reviewRoutes.js

const express = require('express');
const reviewController = require('../controllers/reviewController');
const router = express.Router();

// search for a course
router.get('/reviews', reviewController.reviews);

// Posts review to database
router.post('/createReview', reviewController.createReview);

// details for a singular review on the edit review page
router.get('/reviewDetails/:id', reviewController.reviewDetails);

// delete a review on the edit review page
router.delete('/deleteReview/:id', reviewController.deleteReview);

// all reviews for a course that was searched
router.get('/reviews/:cname', reviewController.courseReview);

module.exports = router;