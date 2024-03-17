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

const editReview = (req, res) => {
    const db = connectToDatabase();

    const {rid, prof, content, grading, anotes, crating } = req.body;
    const updateSQL = 'UPDATE reviews SET prof = ?, content = ?, grading = ?, anotes = ?, crating =? WHERE review_id=? ;'
    db.serialize(() => 
    {
        db.run(updateSQL, [prof, content, grading, anotes, crating, rid], function(err) 
        {
            if (err) 
            {
                console.log(err.message);
                res.status(500).send('Internal Server Error');
                return;
            }
            console.log('Review was inserted successfully');
            res.redirect('/account'); 
        });
    });
    db.close()
}

module.exports = 
{ 
    getCourses, userReviews, editReview
}