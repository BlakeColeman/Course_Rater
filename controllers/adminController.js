//adminController.js

const sqlite3 = require('sqlite3').verbose(); 
const express = require('express');
const router = express.Router();
const databaseFacade = require('../database/databaseFacade');

const db = new databaseFacade();

// get all of the suspended accounts
const suspended = (req, res) => {
    db.suspended(req,res);
}
  
// Unsuspend user option for admin
const unsuspend = (req, res) => {
    db.unsuspend(req,res);
}

// Display the reports for the admin
const displayReports = (req, res) => {
    db.displayReports(req,res);
};

// Suspend user option for admin
const suspend = (req, res) => {
    db.suspend(req,res);
}

// deleting a reported review 
const deleteReview = (req, res) => {
    db.deleteReview(req,res);
}

// dismiss a reported review
const dismissReport = (req, res) => {
    db.dismissReport(req,res);
}

module.exports = 
{
    suspended,
    unsuspend,
    displayReports,
    suspend,
    deleteReview,
    dismissReport
}