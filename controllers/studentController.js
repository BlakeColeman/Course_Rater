//studentController.js

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

// display all reviews a user has made in their account page
const userReviews = (req, res) => {
    const db = connectToDatabase();

    const uname = req.user.uname;  
    const sql = 'SELECT c.cname,r.review_id,r.uname,r.prof,r.content,r.grading,r.anotes,r.crating,r.rcreated FROM reviews r LEFT JOIN courses c on c.cid = r.cid WHERE uname LIKE ? '; // limit the number of courses shown

    db.all(sql, [uname], (err, rows)=> {
        if (err) 
        {
            console.error(err.message);
            res.status(500).send('Internal Server Error');
            return;
        }
        else
            res.json(rows);
    })
    db.close()
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

// creating a review
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

// Allows the user logged in to edit one of their reviews
const editReview = (req, res) => {
    const db = connectToDatabase();

    const {rid, prof, content, grading, anotes, rate } = req.body;
    const updateSQL = 'UPDATE reviews SET prof = ?, content = ?, grading = ?, anotes = ?, crating =? WHERE review_id=? ;'
    db.serialize(() => 
    {
        db.run(updateSQL, [prof, content, grading, anotes, rate, rid], function(err) 
        {
            if (err) 
            {
                console.log(err.message);
                res.status(500).send('Internal Server Error');
                return;
            }
            console.log('Review was edited successfully');
            res.redirect('/account'); 
        });
    });
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

module.exports = 
{ 
    userReviews,
    reviewDetails,
    createReview,
    editReview,
    deleteReview
}
