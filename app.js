const express = require('express');
const session = require('express-session'); 
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const http = require('http');
const path = require('path');
const sqlite3 = require('sqlite3').verbose(); 
var helmet = require('helmet');
const adminRoutes = require('./public/routes/adminRoutes');


// import { SignupForm} from "./signup.js";

const app = express();
const port = 3000;

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





// Serve static files from the 'public' directory
app.use(express.static('public', { index: 'html/index.html' }));

// Middleware
// app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'secret', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Dummy admin user (replace with database integration)
const adminUser = {
    id: 1,
    username: 'admin',
    password: 'adminpassword'
};

// Passport Local Strategy for admin authentication
passport.use('admin-local', new LocalStrategy((username, password, done) => {
    
    if (username === adminUser.username && password === adminUser.password) 
    {
        return done(null, adminUser);
    } 
    else 
    {
        return done(null, false, { message: 'Incorrect username or password' });
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    
    if (id === adminUser.id) 
    {
        done(null, adminUser);
    } 
    else 
    {
        done(null, false);
    }
});

// Admin Routes
app.use(adminRoutes);

app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, 'public','html', 'index.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public','html', 'login.html'));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'public','html', 'signup.html'));
});

app.get('/index2', (req, res) => {
    res.sendFile(path.join(__dirname, 'public','html', 'index2.html'));
});

app.get('/studentAccount', (req, res) => {
    res.sendFile(path.join(__dirname, 'public','html', 'studentAccount.html'));
});

app.get('/adminAccount', (req, res) => {
    res.sendFile(path.join(__dirname, 'public','html', 'adminAccount.html'));
});

app.get('/createReview', (req, res) => {
    res.sendFile(path.join(__dirname, 'public','html', 'createReview.html'));
});

 // Create new user
 app.post('/createUser', function(req,res){
    console.log(req.body)
    // SignupForm(req.body);
    db.serialize(()=>{
      db.run('INSERT INTO users(uname,email,pword) VALUES(?,?,?)', [req.body.uname,req.body.email, req.body.pword], function(err) {
        if (err) {
          return console.log(err.message);
        }
        console.log("New user has been added");
        res.sendFile(path.join(__dirname, 'public','html', 'login.html'));
      });
  });
  }); 



  app.post('/checkUsername', (req, res) => {
    const { uname } = req.body;

    // Check if the username already exists in the database
    db.get('SELECT * FROM users WHERE uname = ?', [uname], function(err, row) {
        if (err) {
            // Handle any errors
            console.error(err.message);
            res.status(500).send('Internal Server Error');
            return;
        }

        if (row) {
            // Username already exists, send a 400 Bad Request response
            res.status(400).send('Username already exists');
        } else {
            // Username doesn't exist, send a 200 OK response
            res.status(200).send('Username available');
        }
    });
});

    app.post('/checkEmail',(req,res) => {
        const { email } = req.body;
        db.get('SELECT * FROM users WHERE uname = ?',[email], function(err, row){
        if (err) {
            // Hanlde any errors
            console.error(err.message);
            res.status(500).send('internal Server Error');
            return;
        }

        if (row) {
            //Email already registered, send a 400 Bad Request response
            res.status(400).send('Email already in use'); 
        }
        else
        {
            //Email not registered, send a 200 OK response
            res.status(200).send('Email available');
        }
    });
    
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
