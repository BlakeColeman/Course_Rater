//reviewController.js

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

const createReview = (req, res) => {

    const db = connectToDatabase();
    
    const uname = req.user.uname;  
    const cname = req.body.cname;
    const currentDate = new Date().toISOString().split('T')[0];

    const { prof, content, grading, anotes, rate } = req.body;
    const sql = 'SELECT cid FROM courses WHERE cname LIKE ?';
    db.get(sql, [cname], (err, row) => {
        if (err) {
            console.log(err.message);
            res.status(500).send('Internal Server Error');
            return;
        }

        if (!row) {
            console.log('Course not found'); 
            res.status(404).send('Course not found');
            return;
        }

        const cid = row.cid;
        
        const insertSql = 'INSERT INTO reviews (cid, prof, content, grading, anotes, crating, uname, rcreated) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        db.serialize(() => {
            db.run(insertSql, [cid,prof,content, grading, anotes, rate, uname, currentDate], function(err) {
                if (err) {
                    console.log(err.message);
                    res.status(500).send('Internal Server Error');
                    return;
                }
                console.log('Review was inserted successfully');
                res.redirect('/index'); 
            });
        });
    });
}

// display a single review to either delete or edit
const reviewDetails = (req, res) => {
    const db = connectToDatabase();

    const reviewId = req.params.id;
    const sql = 'SELECT c.cname,r.review_id,r.uname,r.prof,r.content,r.grading,r.anotes,r.crating,r.rcreated FROM reviews r LEFT JOIN courses c on c.cid = r.cid WHERE r.review_id = ?'; 

    db.all(sql, [reviewId], (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Internal Server Error');
            return;
        } else 
            res.json(rows);
    })
    db.close()
}

// deleting a review on the edit review page
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

module.exports = 
{ 
    reviews,createReview,reviewDetails,deleteReview,courseReview
}
