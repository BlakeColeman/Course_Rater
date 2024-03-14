const sqlite3 = require('sqlite3').verbose(); 
const path = require('path');

function connectToDatabase() {
  return new sqlite3.Database('./database/UofRCourseRater', (err) => {
      if (err) {
          console.error(err.message);
      }
  });
}

module.exports = 
{ 
  createUser: function(req,res)
  {
    const db = connectToDatabase();
    
    // SignupForm(req.body);
    console.log(req.body)
    db.run('INSERT INTO users(uname,email,pword) VALUES(?,?,?)', [req.body.uname,req.body.email, req.body.pword], function(err) {
      if (err) 
      {
        return console.log(err.message);
      }
      console.log("New user has been added");
      res.sendFile(path.join(__dirname, '../','public/view', 'login.html'));
    });
    db.close()
  },

  checkUsername: function(req,res)
  {
    const db = connectToDatabase();

    const {uname} = req.body;
    console.log("Checking uname:",uname,"for availability");
    var sql = 'SELECT * FROM users WHERE uname = ?';
    // Check if the username already exists in the database
    db.all(sql, [uname], (err, rows)=> 
    {
        if (err) {
            console.error(err.message);
            res.status(500).send('Internal Server Error');
            return;
        }
        if (rows.length!=0) {
            // Username already exists, send a 400 Bad Request response
            res.status(400).send('Username already exists');
            return;
        } else {
            // Username doesn't exist, send a 200 OK response
            res.status(200).send('Username available');
            return;
        }
    });
    db.close()
  },

  checkEmail: function(req,res)
  {
    const db = connectToDatabase();

    const {email} = req.body;
    console.log("checking Email",email,"for availability");
    var sql ='SELECT * FROM users WHERE email = ?';
    db.all(sql,[email],(err, rows) =>
    {
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
    })
    db.close()
  },

  verifyPassword: function(email,password,done)
  {
    const db = connectToDatabase();

    db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
      if (err) {
        console.error(err);
        return done(err);
       } 
       if (!row) {
        return done(null, false, { message: 'Incorrect email.' });
        }
    if (row.pword !== password) {
        return done(null, false, { message: 'Incorrect password.' });
        }
    return done(null, row);
    });
    db.close()
  },
  
  createReview: function(req,res)
  {
    const db = connectToDatabase();
    
    const uname = req.user.uname;  
    const cname = req.body.cname;

    const { content, grading, anotes, rate } = req.body;
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
        
        const insertSql = 'INSERT INTO reviews (cid, content, grading, anotes, crating, uname) VALUES (?, ?, ?, ?, ?, ?)';
        db.serialize(() => {
            db.run(insertSql, [cid, content, grading, anotes, rate, uname], function(err) {
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
    db.close()
  },

  // get the courses while searching
  getCourses: function(req,res)
  {
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
  },

  getUserData: function(uname,done)
  {
    const db = connectToDatabase();

    db.get('SELECT * FROM users WHERE uname = ?', [uname], (err, user) => {
      done(err, user);
  });
  db.close()
  },

  // display all reviews a user has made in their account page
  userReviews: function(req,res)
  {
    const db = connectToDatabase();

    const uname = req.user.uname;  
    const sql = 'SELECT c.cname,r.review_id, r.uname,r.content,r.grading,r.anotes,r.crating FROM reviews r LEFT JOIN courses c on c.cid = r.cid WHERE uname LIKE ? '; // limit the number of courses shown

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
  },

  // display a single review to either delete or edit
  reviewDetails: function(req, res) 
  {
    const db = connectToDatabase();

    const reviewId = req.params.id;
    const sql = 'SELECT c.cname,r.review_id, r.uname,r.content,r.grading,r.anotes,r.crating FROM reviews r LEFT JOIN courses c on c.cid = r.cid WHERE r.review_id = ?'; 

    db.all(sql, [reviewId], (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Internal Server Error');
            return;
        } else
            res.json(rows);
    })
    db.close()
  },

  // display reviews for a specific course
  CourseReview: function(req, res) 
  {
    const db = connectToDatabase();

    const courseName = req.params.cname;
    const sql = 'SELECT c.cname,r.review_id, r.uname,r.content,r.grading,r.anotes,r.crating FROM reviews r LEFT JOIN courses c on c.cid = r.cid WHERE cname LIKE ? ';

    db.all(sql, [courseName], (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Internal Server Error');
            return;
        } else
            res.json(rows);
    })
    db.close()
  },

  // deleting a review on the edit review page
  deleteReview: function(req,res)
  {
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
  },

  // takes the user to the correct review page given search
  reviews: function(req, res) 
  {
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
  },

  reportReview: function(req,res)
  {
    const db = connectToDatabase();

    const rid =req.body.rid;
    const sql = 'UPDATE SET flags = flags+1 WHERE reviews.flags=?';
    db.all(sql,[rid],(err,rows)=>{
      if (err) 
      {
          console.error(err.message);
          res.status(500).send('Internal Server Error');
          return;
      }
      
      if (rows.length === 0) 
      {
          res.status(404).send('Review Not found');
      } 
    })
    db.close()
  },

  editReview: function(req,res)
  {
    const db = connectToDatabase();
  
    console.log(req.body);

    const {rid, content, grading, anotes, rate } = req.body;
    const updateSQL = 'UPDATE reviews SET content = ?, grading = ?, anotes = ?, crating =? WHERE review_id=? ;'
    db.serialize(() => 
    {
      db.run(updateSQL, [content, grading, anotes, rate, rid], function(err) 
      {
        if (err) 
        {
          console.log(err.message);
          res.status(500).send('Internal Server Error');
          return;
        }
        console.log('Review was inserted successfully');
        res.redirect('/index'); 
      });
    });
    db.close()
  }
}
