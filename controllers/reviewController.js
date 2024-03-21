//reviewController.js
// accessed by the student and admin

const sqlite3 = require('sqlite3').verbose(); 
const express = require('express');
const router = express.Router();
const path = require('path');

// connect to the database
function connectToDatabase() {
    return new sqlite3.Database('./database/UofRCourseRater', (err) => {
        if (err) {
            console.error(err.message);
        }
    });
}

// get the courses while searching
const getCourses = (req, res) => {
    const db = connectToDatabase();

    const { cname } = req.query;

    const sql = 'SELECT * FROM courses WHERE cname LIKE ? LIMIT 10'; // limit the number of courses shown
    
    const searchQuery = '%' + cname + '%';

    db.all(sql, [searchQuery], (err, rows) => {
        if (err) {
          console.error(err.message);
          res.status(500).send('Internal Server Error');
          return;
        }

        if (rows.length === 0) 
        {
          res.status(404).send('Course does not exist');
        }
        else 
        {
          res.json(rows);
        }
    });
    db.close()
}
  
// takes the user to the correct review page given search
const reviews = (req, res) => {
  
    const db = connectToDatabase();
    const { cname } = req.query; 
    
    const sql = 'SELECT * FROM courses WHERE cname LIKE ?';
    
    db.all(sql, [cname], (err, rows) => {
        if (err) 
        {
            console.error(err.message);
            res.status(500).send('Internal Server Error');
            return;
        }
        
        if (rows.length === 0) 
        {
            res.redirect('/index');
        } 
        else 
        {
            res.sendFile(path.join(__dirname,'../', 'public','view', 'reviewpage.html'));

        }
    });
    db.close()
}

// display reviews for a specific course
const courseReview = (req, res) => {
    const db = connectToDatabase();

    const courseName = req.params.cname;
    const sql = 'SELECT c.cname,r.review_id,r.uname,r.prof,r.content,r.grading,r.anotes,r.crating,r.rcreated FROM reviews r LEFT JOIN courses c on c.cid = r.cid WHERE cname LIKE ? ';

    db.all(sql, [courseName], (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Internal Server Error');
            return;
        } else
            res.json(rows);
    })
    db.close()
}

// Report a review
const reportReview = (req, res) => {
    const db = connectToDatabase();

    const reviewId = req.params.reviewId;
    
    const sql = 'UPDATE reviews SET flags = 1 WHERE review_id = ?';

    db.run(sql, [reviewId], (err) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Internal Server Error');
            return;
        }
        console.log(`Review ${reviewId} reported successfully`);
        res.status(200)
    });

    db.close();
}

module.exports = 
{ 
    getCourses,
    reviews,
    courseReview,
    reportReview
}
