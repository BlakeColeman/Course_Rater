//reviewController.js
// accessed by the student and admin 
const express = require('express');
const router = express.Router();
const path = require('path');
const databaseModules = require('./database/databaseModules');

db = databaseModules;


// get the courses while searching
const getCourses = (req, res) => {
    db.getCourses(req,res);
}
  
// takes the user to the correct review page given search
const reviews = (req, res) => {
    db.reviews(req,res);
}

// display reviews for a specific course
const courseReview = (req, res) => {
    db.courseReview(req,res);
}

// Report a review
const reportReview = (req, res) => {
    db.reportReview(req,res);
}

module.exports = 
{ 
    getCourses,
    reviews,
    courseReview,
    reportReview
}
