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

    db.all('SELECT * FROM users WHERE suspended = 1', (err, rows) => {
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

    db.run('UPDATE users SET suspended = 0 WHERE uname = ?', [uname], function(err) {
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

module.exports = 
{
    suspended,
    unsuspend
}