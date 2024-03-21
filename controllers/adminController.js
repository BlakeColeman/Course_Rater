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

module.exports = 
{
    suspended,
    unsuspend,
    displayReports,
    suspend
}