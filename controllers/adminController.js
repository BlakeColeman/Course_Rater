//adminController.js

const sqlite3 = require('sqlite3').verbose(); 
const express = require('express');
const router = express.Router();

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
    const db = connectToDatabase();

    const sql = 'SELECT * FROM users WHERE suspended = 1';
    db.all(sql, (err, rows) => {
        if (err) {
          console.log(err.message);
          res.status(500).send('Internal Server Error');
          return;
        } else {
            res.json(rows);
        }
    });
    db.close()
  }
  
// Unsuspend user option for admin
const unsuspend = (req, res) => {
    const db = connectToDatabase();

    const uname = req.params.uname;

    const sql = 'UPDATE users SET suspended = 0 WHERE uname = ?';
    
    db.run(sql, [uname], function(err) {
        if (err) {
            console.error(err.message);
            res.status(500).send('Internal Server Error');
            return;
        }
        else{
          console.log(`User ${uname} unsuspended successfully`);
          res.sendStatus(200); // Send success response
        }
    });

    db.close();
  }

// Display the reports for the admin
const displayReports = (req, res) => {
    const db = connectToDatabase();

    const sql = 'SELECT * FROM reviews WHERE flags = 1';
    db.all(sql, (err, rows) => {
        if (err) {
            console.log(err.message);
            res.status(500).send('Internal Server Error');
            return;
        } else {
            res.json(rows); 
        }
    });
    db.close();
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
    const db = connectToDatabase();

    const reviewId = req.params.id;
    const sql = 'DELETE FROM reviews WHERE review_id = ?';

    db.run(sql, [reviewId], function(err) {
        if (err) {
            console.error(err.message);
            res.status(500).send('Internal Server Error');
            return;
        }
        console.log(`Review ${reviewId} deleted successfully`);
        res.sendStatus(200); // Send success response
    });
    db.close()
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
        res.status(200)
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