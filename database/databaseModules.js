//const sqlite3 = require('sqlite3').verbose(); 


module.exports = 
{ 
  hello: function() 
  {
     return "Hello";
  },

  connectToDatabase: function()
  { 
    const sqlite3 = require('sqlite3').verbose();
    let db = new sqlite3.Database('./database/UofRCourseRater', (err) => {
      if (err) 
      {
        console.error(err.message);
      }
      else
      {
          console.log('Connected to the CourseRater database.');
      }
    });
    return db;
  },

  createReview: function(req,res)
  {
    const sqlite3 = require('sqlite3').verbose(); 
    let db = new sqlite3.Database('./database/UofRCourseRater', (err) => {
      if (err) 
      {
        console.error(err.message);
      }
      else
      {
          console.log('Connected to the CourseRater database.');
      }
    });
    var {uname} = req.body.uname;
    var {cname} = req.body.cname;
    var {cid} = req.body.cid;
    var {rdesc} = req.body.rdesc;
    var {crating} = req.body.crating;
    var {flags} = req.body.flags;
    var sql = 'INSERT INTO reviews (cname, cid, rdesc, crating, flags,uname) Values(?,?,?,?,?,?)';
    db.run(sql,[uname,cname,cid,rdesc,crating,flags], function(err)
    {
        if (err) 
        {
            return console.log(err.message);
        }
    })
  },

  searchCourse: function(req,res)
  {
    const sqlite3 = require('sqlite3').verbose(); 
    let db = new sqlite3.Database('./database/UofRCourseRater', (err) => {
      if (err) 
      {
        console.error(err.message);
      }
      else
      {
          console.log('Connected to the CourseRater database.');
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
            res.sendFile(path.join(__dirname, 'public','html', 'reviewpage.html'));

        }
    });
  },

  getCourses: function(req,res)
  {
    const sqlite3 = require('sqlite3').verbose(); 
    let db = new sqlite3.Database('./database/UofRCourseRater', (err) => {
      if (err) 
      {
        console.error(err.message);
      }
      else
      {
          console.log('Connected to the CourseRater database.');
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

        if (rows.length === 0) {
            // Course doesn't exist, send a 404 Not Found response
            res.status(404).send('Course not found');
        } else {
            // Course found, send the list of matching courses
            res.status(200).json(rows);
        }
    });
  },

  getUsersReviews: function(req,res)
  {
    const sqlite3 = require('sqlite3').verbose(); 
    let db = new sqlite3.Database('./database/UofRCourseRater', (err) => {
      if (err) 
      {
        console.error(err.message);
      }
      else
      {
          console.log('Connected to the CourseRater database.');
      }
    });
    const { uname } = req.uname;
    const sql = 'SELECT * FROM reviews WHERE uname LIKE ?'; // limit the number of courses shown

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
  },

  getCourseReviews: function(req,res)
  {
    const sqlite3 = require('sqlite3').verbose(); 
    let db = new sqlite3.Database('./database/UofRCourseRater', (err) => {
      if (err) 
      {
        console.error(err.message);
      }
      else
      {
          console.log('Connected to the CourseRater database.');
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
  },

  createUser: function(req,res)
  {
    const sqlite3 = require('sqlite3').verbose(); 
    let db = new sqlite3.Database('./database/UofRCourseRater', (err) => {
      if (err) 
      {
        console.error(err.message);
      }
      else
      {
          console.log('Connected to the CourseRater database.');
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
      res.sendFile(path.join(__dirname, '../','html', 'login.html'));
    });
  },

  checkUsername: function(req,res)
  {
    const sqlite3 = require('sqlite3').verbose(); 
    let db = new sqlite3.Database('./database/UofRCourseRater', (err) => {
      if (err) 
      {
        console.error(err.message);
      }
      else
      {
          console.log('Connected to the CourseRater database.');
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
  },

  checkEmail: function(req,res)
  {
    const sqlite3 = require('sqlite3').verbose(); 
    let db = new sqlite3.Database('./database/UofRCourseRater', (err) => {
      if (err) 
      {
        console.error(err.message);
      }
      else
      {
          console.log('Connected to the CourseRater database.');
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
    db.sqlite3.cl
  }
}


