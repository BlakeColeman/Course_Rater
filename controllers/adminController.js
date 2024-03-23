//adminController.js

const sqlite3 = require('sqlite3').verbose(); 
const express = require('express');
const router = express.Router();
const databaseModules = require('./database/databaseModules');

const db = databaseModules;

// connect to the database
function connectToDatabase() {
    return new sqlite3.Database('./database/UofRCourseRater', (err) => {
        if (err) {
            console.error(err.message);
        }
    });
}

// get all of the suspended accounts
const suspended = (req, res) => {
    db.databaseModules(req,res);
  }
  
// Unsuspend user option for admin
const unsuspend = (req, res) => {
    db.databaseModules(req,res);
  }

// Display the reports for the admin
const displayReports = (req, res) => {
    db.databaseModules(req,res);
};

// Suspend user option for admin
const suspend = (req, res) => {
    const db = connectToDatabase();

    const uname = req.params.uname;

    const sql = 'UPDATE users SET suspended = 1 WHERE uname = ?';
    
    db.run(sql, [uname], function(err) {
        if (err) {
            console.error(err.message);
            res.status(500).send('Internal Server Error');
            return;
        }
        else{
          console.log(`User ${uname} Suspended successfully`);
          res.sendStatus(200); // Send success response
        }
    });

    db.close();
}

// deleting a reported review 
const deleteReview = (req, res) => {
    db.deleteReview(req,res);
}

// dismiss a reported review
const dismissReport = (req, res) => {
    const db = connectToDatabase();

    const reviewId = req.params.reviewId;
    
    const sql = 'UPDATE reviews SET flags = 0 WHERE review_id = ?';

    db.run(sql, [reviewId], function(err) {
        if (err) {
            console.error(err.message);
            res.status(500).send('Internal Server Error');
            return;
        }
        console.log(`Review ${reviewId} dismissed successfully`);
        res.status(200); // Send success response
    });

    db.close();
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