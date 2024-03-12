const sqlite3 = require('sqlite3').verbose(); 
const path = require('path');

module.exports = 
{ 
  createReview: function(req,res)
  {
    const sqlite3 = require('sqlite3').verbose(); 
    let db = new sqlite3.Database('./database/UofRCourseRater', (err) => {
      if (err) 
      {
        console.error(err.message);
      }
    });

    console.log(req.body);
    
    const uname = req.user.uname;  
    console.log(uname);

    const cname = req.body.cname;
    console.log(cname);

    const { content, grading, anotes, rate } = req.body;
    console.log(rate);
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
                console.log('Review inserted successfully');
                res.redirect('/index'); 
            });
        });
    });
    //db.close()
  },

  searchCourse: function(req,res)
  {
    const sqlite3 = require('sqlite3').verbose(); 
    let db = new sqlite3.Database('./database/UofRCourseRater', (err) => {
      if (err) 
      {
        console.error(err.message);
      }
    });
    const { cname } = req.query; // Extracting 'cname' from the query string
        
    const sql = 'SELECT * FROM courses WHERE cname LIKE ?';
    
    db.all(sql, [cname], (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Internal Server Error');
            return;
        }
        
        if (rows.length === 0) {
            // Course doesn't exist, send a 404 Not Found response
            res.status(404).send('Course not found');
        } else {
            // Course found, send the list of matching courses
            res.sendFile(path.join(__dirname,'../', 'public','html', 'reviewpage.html'));

        }
    });
    db.close()
  },

  getCourses: function(req,res)
  {
    const sqlite3 = require('sqlite3').verbose(); 
    let db = new sqlite3.Database('./database/UofRCourseRater', (err) => {
      if (err) 
      {
        console.error(err.message);
      }
    });

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
            // Course doesn't exist, send a 404 Not Found response
            res.status(404).send('Course not found');
        }
        else 
        {
            // Course found send the list of matching courses
            res.json(rows);
        }
    });
    db.close()
  },

  getUsersReviews: function(req,res)
  {
    const sqlite3 = require('sqlite3').verbose(); 
    let db = new sqlite3.Database('./database/UofRCourseRater', (err) => {
      if (err) 
      {
        console.error(err.message);
      }
    });
    const { uname } = req.uname;
    const sql = 'SELECT c.cname,r.uname,r.content,r.grading,r.anotes FROM reviews r WHERE uname LIKE ? LEFT JOIN courses c on c.cid = r.cid'; // limit the number of courses shown

    db.all(sql, uname, (err, rows)=> {
        if (err) 
        {
            console.error(err.message);
            res.status(500).send('Internal Server Error');
            return;
        }
        else
        {
          res.send(rows);
        }
    })
    db.close()
  },

  getCourseReviews: function(req,res)
  {
    const sqlite3 = require('sqlite3').verbose(); 
    let db = new sqlite3.Database('./database/UofRCourseRater', (err) => {
      if (err) 
      {
        console.error(err.message);
      }
    });
    const {cid} = req.cid;
    
    db.all(sql,cname,(err,rows)=>
    {
      if (err)
      {
        console.error(err.message);
        res.status(500).send('Internal Server Error');
        return;
      }
      else
      {
        res.send(rows);
      }
    })
    db.close()
  },

  createUser: function(req,res)
  {
    const sqlite3 = require('sqlite3').verbose(); 
    let db = new sqlite3.Database('./database/UofRCourseRater', (err) => {
      if (err) 
      {
        console.error(err.message);
      }
    });
    // SignupForm(req.body);
    console.log(req.body)
    db.run('INSERT INTO users(uname,email,pword) VALUES(?,?,?)', [req.body.uname,req.body.email, req.body.pword], function(err) {
      if (err) 
      {
        return console.log(err.message);
      }
      console.log("New user has been added");
      res.sendFile(path.join(__dirname, '../','public/html', 'login.html'));
    });
    db.close()
  },

  checkUsername: function(req,res)
  {
    //const sqlite3 = require('sqlite3').verbose(); 
    let db = new sqlite3.Database('./database/UofRCourseRater', (err) => {
      if (err) 
      {
        console.error(err.message);
      }
    });
    const {uname} = req.body;
    console.log("Checking uname:",uname,"for availability");
    var sql = 'SELECT * FROM users WHERE uname = ?';
    // Check if the username already exists in the database
    db.all(sql, [uname], (err, rows)=> 
    {
        if (err) {
            // Handle any errors
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
    const sqlite3 = require('sqlite3').verbose(); 
    let db = new sqlite3.Database('./database/UofRCourseRater', (err) => {
      if (err) 
      {
        console.error(err.message);
      }
    });
    const {email} = req.body;
    console.log("checking Email",email,"for availability");
    var sql ='SELECT * FROM users WHERE email = ?';
    db.all(sql,[email],(err, rows) =>
    {
        if (err) 
        {
            // Handle any errors
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
    const sqlite3 = require('sqlite3').verbose(); 
    let db = new sqlite3.Database('./database/UofRCourseRater', (err) => {
      if (err) 
      {
        console.error(err.message);
      }
    });

    db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
      if (err) {
        console.error(err); // Log the error
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

  getUserData: function(uname,done)
  {
    const sqlite3 = require('sqlite3').verbose(); 
    let db = new sqlite3.Database('./database/UofRCourseRater', (err) => {
      if (err) 
      {
        console.error(err.message);
      }
    });
    db.get('SELECT * FROM users WHERE uname = ?', [uname], (err, user) => {
      done(err, user);
  });
  db.close()
  },

  userReviews: function(req,res)
  {
    const sqlite3 = require('sqlite3').verbose(); 
    let db = new sqlite3.Database('./database/UofRCourseRater', (err) => {
      if (err) 
      {
        console.error(err.message);
      }
    });

    const uname = req.user.uname;  
    console.log('User accessing account:', uname);
    const sql = 'SELECT c.cname,r.uname,r.content,r.grading,r.anotes,r.crating FROM reviews r LEFT JOIN courses c on c.cid = r.cid WHERE uname LIKE ? '; // limit the number of courses shown

    //const sql = 'SELECT * FROM reviews WHERE uname LIKE ?';

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

  reviews: function(req, res) 
  {

    const sqlite3 = require('sqlite3').verbose(); 
    let db = new sqlite3.Database('./database/UofRCourseRater', (err) => {
      if (err) 
      {
        console.error(err.message);
      }
    });

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
            // Course doesn't exist, send a 404 Not Found response
            res.status(404).send('Course not found');
        } 
        else 
        {
            // Course found, send the list of matching courses
            res.sendFile(path.join(__dirname,'../', 'public','html', 'reviewpage.html'));

        }
    });
    db.close()
  },

  reportReview: function(req,res)
  {
    const sqlite3 = require('sqlite3').verbose(); 
    let db = new sqlite3.Database('./database/UofRCourseRater', (err) => {
      if (err) 
      {
        console.error(err.message);
      }
    });
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
          // Course doesn't exist, send a 404 Not Found response
          res.status(404).send('Review Not found');
      } 
    })
    db.close()
  }

}