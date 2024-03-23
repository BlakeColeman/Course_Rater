// databaseModule.js
// Facade pattern

const sqlite3 = require('sqlite3').verbose(); 
const path = require('path');

module.exports  = class database 
{
  constructor() 
  {
    this.db = new sqlite3.Database('./database/UofRCourseRater', (err) => {
      if (err) {
        console.error(err.message);
      }
    });
  }

  //Create a user
  createUser(req,res) {
    this.db.run('INSERT INTO users(uname,email,pword) VALUES(?,?,?)', [req.body.uname,req.body.email, req.body.pword], function(err) {
      if (err) 
      {
        return console.log(err.message);
      }
      console.log("New user has been added");
      res.sendFile(path.join(__dirname, '../','public/view', 'login.html'));
    });
  }

  //Check if a username is already being used
  checkUsername(req,res) {
    const {uname} = req.body;

    var sql = 'SELECT * FROM users WHERE uname = ?';

    // Check if the username already exists in the database
    this.db.all(sql, [uname], (err, rows)=> {
        if (err) 
        {
          console.error(err.message);
          res.status(500).send('Internal Server Error');
          return;
        }
        if (rows.length!=0) 
        {
          // Username already exists, send a 400 Bad Request response
          res.status(400).send('Username already exists');
          return;
        } 
        else 
        {
          // Username doesn't exist, send a 200 OK response
          res.status(200).send('Username available');
          return;
        }
    });
  }

  //Check if an email is already being used
  checkEmail(req,res) {
    const {email} = req.body;

    var sql ='SELECT * FROM users WHERE email = ?';

    this.db.all(sql,[email],(err, rows) => {
        if (err) 
        {
          console.error(err.message);
          res.status(500).send('internal Server Error');
          return;
        }
        if (rows.length != 0) 
        {
          //Email already registered, send a 400 Bad Request response
          res.status(400).send('Email already in use');
        }
        else 
        {
          //Email not registered, send a 200 OK response
          res.status(200).send('Email available');
        }
    });
  }

  //Verify a users password is correct
  verifyPassword(email,password,done) {
    this.db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
      if (err) 
      {
        console.error(err);
        return done(err);
      } 
      if (!row) 
      {
        return done(null, false, { message: 'Incorrect email.' });
      }
      if (row.pword !== password) 
      {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, row);
    });
  }

  //Create a Review with the specified values
  createReview(req,res) {
    const uname = req.user.uname;  
    const cname = req.body.cname;
    const currentDate = new Date().toISOString().split('T')[0];
    const { prof, content, grading, anotes, rate } = req.body;

    const sql = 'SELECT cid FROM courses WHERE cname LIKE ?';

    this.db.get(sql, [cname], (err, row) => {
      if (err) 
      {
        console.log(err.message);
        res.status(500).send('Internal Server Error');
        return;
      }

      if (!row) 
      {
        console.log('Course not found'); 
        res.status(404).send('Course not found');
        return;
      }

      const cid = row.cid;
        
      const insertSql = 'INSERT INTO reviews (cid, prof, content, grading, anotes, crating, uname, rcreated) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
      
      this.db.serialize(() => {
        this.db.run(insertSql, [cid,prof,content, grading, anotes, rate, uname, currentDate], function(err) {
          if (err) 
          {
            console.log(err.message);
            res.status(500).send('Internal Server Error');
            return;
          }
          console.log('Review was inserted successfully');
          res.redirect(`/reviews?cname=${cname}`);
        });
      });
    });
  }

  //Get top 10 courses with course name similar to *
  getCourses(req,res) {
    const { cname } = req.query;

    const sql = 'SELECT * FROM courses WHERE cname LIKE ? LIMIT 10'; // limit the number of courses shown
    
    const searchQuery = '%' + cname + '%';

    this.db.all(sql, [searchQuery], (err, rows) => {
      if (err) 
      {
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
  }

  //Get a users data based on their username
  getUserData(uname,done)
  {
    this.db.get('SELECT * FROM users WHERE uname = ?', [uname], (err, user) => {
      done(err, user);
    });
  }

  // display all reviews a user has made in their account page
  userReviews(req,res) {
    const uname = req.user.uname;  

    const sql = 'SELECT c.cname,r.review_id,r.uname,r.prof,r.content,r.grading,r.anotes,r.crating,r.rcreated FROM reviews r LEFT JOIN courses c on c.cid = r.cid WHERE uname LIKE ? '; // limit the number of courses shown

    this.db.all(sql, [uname], (err, rows)=> {
      if (err) 
      {
        console.error(err.message);
        res.status(500).send('Internal Server Error');
        return;
      }
      else
        res.json(rows);
    });
  }

  // display a single review to either delete or edit
  reviewDetails(req, res) {
    const reviewId = req.params.id;

    const sql = 'SELECT c.cname,r.review_id,r.uname,r.prof,r.content,r.grading,r.anotes,r.crating,r.rcreated FROM reviews r LEFT JOIN courses c on c.cid = r.cid WHERE r.review_id = ?'; 
  
    this.db.all(sql, [reviewId], (err, rows) => {
      if (err) 
      {
        console.error(err.message);
        res.status(500).send('Internal Server Error');
        return;  
      } 
      else 
      {
        res.json(rows);
      }
    });
  }

  // display reviews for a specific course
  courseReview(req, res) {
    const courseName = req.params.cname;

    const sql = 'SELECT c.cname,r.review_id,r.uname,r.prof,r.content,r.grading,r.anotes,r.crating,r.rcreated FROM reviews r LEFT JOIN courses c on c.cid = r.cid WHERE cname LIKE ? ';

    this.db.all(sql, [courseName], (err, rows) => {
      if (err) 
      {
        console.error(err.message);
        res.status(500).send('Internal Server Error');
        return;
      } 
      else {
        res.json(rows);
      }
    });
  }

  // deleting a review on the edit review page
  deleteReview(req,res) {
    const reviewId = req.params.id;

    const sql = 'DELETE FROM reviews WHERE review_id = ?';

    this.db.run(sql, [reviewId], function(err) {
      if (err) 
      {
        console.error(err.message);
        res.status(500).send('Internal Server Error');
        return;
      }
      console.log(`Review ${reviewId} deleted successfully`);
      res.sendStatus(200); // Send success response
    });
  }

  // takes the user to the correct review page given search
  reviews(req, res) {  
    const { cname } = req.query; 
    
    const sql = 'SELECT * FROM courses WHERE cname LIKE ?';
    
    this.db.all(sql, [cname], (err, rows) => {
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
  }

  // report a review
  reportReview(req,res) {
    const reviewId = req.params.reviewId;
    
    const sql = 'UPDATE reviews SET flags = 1 WHERE review_id = ?';

    this.db.run(sql, [reviewId], (err) => {
      if (err) 
      {
        console.error(err.message);
        res.status(500).send('Internal Server Error');
        return;
      }
      console.log(`Review ${reviewId} reported successfully`);
      res.status(200)
    });
  }

  // get all of the suspended accounts
  suspended(req, res) {
    const sql = 'SELECT * FROM users WHERE suspended = 1';

    this.db.all(sql, (err, rows) => {
      if (err) 
      {
        console.log(err.message);
        res.status(500).send('Internal Server Error');
        return;
      } 
      else 
      {
        res.json(rows);
      }
    });
  }
  
  // Unsuspend user option for admin
  unsuspend(req, res) {
    const uname = req.params.uname;

    const sql = 'UPDATE users SET suspended = 0 WHERE uname = ?';
    
    this.db.run(sql, [uname], function(err) {
      if (err) 
      {
        console.error(err.message);
        res.status(500).send('Internal Server Error');
        return;
      } 
      else 
      {
        console.log(`User ${uname} unsuspended successfully`);
        res.sendStatus(200); // Send success response
      }
    });
  }

  // edit a review
  editReview(req,res) {
    const {rid, prof, content, grading, anotes, rate } = req.body;

    const updateSQL = 'UPDATE reviews SET prof = ?, content = ?, grading = ?, anotes = ?, crating =? WHERE review_id=? ;'

    this.db.serialize(() => {
      this.db.run(updateSQL, [prof, content, grading, anotes, rate, rid], function(err) {
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
  }

  // Display the reports for the admin
  displayReports(req, res) {
    const sql = 'SELECT * FROM reviews WHERE flags = 1';

    this.db.all(sql, (err, rows) => {
      if (err) 
      {
        console.log(err.message);
        res.status(500).send('Internal Server Error');
        return;
      } 
      else 
      {
        res.json(rows); 
      }
    });
  }

  // Suspend user option for admin
suspend(req, res) {
  const uname = req.params.uname;

  const sql = 'UPDATE users SET suspended = 1 WHERE uname = ?';
  
  this.db.run(sql, [uname], function(err) {
      if (err) 
      {
          console.error(err.message);
          res.status(500).send('Internal Server Error');
          return;
      }
      else 
      {
        console.log(`User ${uname} Suspended successfully`);
        res.sendStatus(200); // Send success response
      }
  });
}

// dismiss a reported review
dismissReport (req, res) {
  const reviewId = req.params.reviewId;

  const sql = 'UPDATE reviews SET flags = 0 WHERE review_id = ?';

  this.db.run(sql, [reviewId], function(err) {
      if (err) 
      {
          console.error(err.message);
          res.status(500).send('Internal Server Error');
          return;
      }
      console.log(`Review ${reviewId} dismissed successfully`);
      res.status(200); // Send success response
  });
}

}