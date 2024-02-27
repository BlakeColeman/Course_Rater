const express = require('express');
const router = express.Router();
const path = require('path');
const sqlite3 = require('sqlite3').verbose(); 

//connecting to the database
let db = new sqlite3.Database('./public/database/UofRCourseRater', (err) => {
    if (err) 
    {
      console.error(err.message);
    }
    else
    {
        console.log('Connected to the CourseRater database.');
    }
  });

 // Create new user
 router.post('/createUser', function(req,res){
    console.log(req.body)
    // SignupForm(req.body);
    db.serialize(()=>{
      db.run('INSERT INTO users(uname,email,pword) VALUES(?,?,?)', [req.body.uname,req.body.email, req.body.pword], function(err) {
        if (err) 
        {
          return console.log(err.message);
        }
        console.log("New user has been added");
        res.sendFile(path.join(__dirname, '../','html', 'login.html'));
      });
  });
  }); 

  

  router.post('/checkUsername', (req, res) => 
  {
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
});



router.post('/checkEmail',(req,res) => 
{
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

});


module.exports = router;