//studentController.js
const express = require('express');
const router = express.Router();
const path = require('path');
const databaseModules = require('../database/databaseModules');

const db=new databaseModules();

// display all reviews a user has made in their account page
const userReviews = (req, res) => 
{
    db.userReviews(req,res);
}

// display a single review to either delete or edit
const reviewDetails = (req, res) => 
{

    db.reviewDetails(req,res);
}

// creating a review
const createReview = (req, res) => 
{
    db.createReview(req,res);
}

// Allows the user logged in to edit one of their reviews
const editReview = (req, res) => {
    db.editReview(req,res);
}

// deleting a review on the edit review page
const deleteReview = (req, res) => {
    db.deleteReview(req,res);
}

module.exports = 
{ 
    userReviews,
    reviewDetails,
    createReview,
    editReview,
    deleteReview
}