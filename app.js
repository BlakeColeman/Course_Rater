const express = require('express');
const session = require('express-session'); 
const bodyParser = require('body-parser');
const path = require('path');
const studentController = require('./public/controller/studentController');
const LoginController = require('./public/controller/LoginController');
const SignUpController = require('./public/controller/SignUpController');
const courseDatabase = require('./database/databaseModules');
const databaseModules = require('./database/databaseModules');

// import { SignupForm} from "./signup.js";

const app = express();
const port = 3000;

// Middleware
// Serve static files from the 'public' directory
app.use(express.static('public', { index: 'html/index.html' }));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
    secret: 'your-secret-key',
    resave: true,
    saveUninitialized: true
}));


// Controllers
app.use(studentController); // Student Controllers
app.use(SignUpController); //signup Controllers
app.use(LoginController); // login Controllers


app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, 'public','html', 'index.html'));
});

//Deleted index2 route 
//will delete index2file after a few days
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public','html', 'login.html'));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'public','html', 'signup.html'));
});


app.get('/studentAccount', (req, res) => {
    res.sendFile(path.join(__dirname, 'public','html', 'studentAccount.html'));
});

app.get('/createReview', (req, res) => {
    res.sendFile(path.join(__dirname, 'public','html', 'createReview.html'));
});

app.get('/Review', (req, res) => {
    res.sendFile(path.join(__dirname, 'public','html', 'personalReview.html'));
});



// app.get('/user', (req, res) => {
//     if (req.user) 
//     {
//         // User is logged in, send user information
//         res.json({ username: req.user.username, email: req.user.email });
//     } 
//     else 
//     {
//         // User is not logged in
//         res.status(401).send('Not logged in');
//     }
// });

// search for a course
app.get('/reviews', (req, res) => {
    courseDatabase.reviews(req,res);
});
    
// Retrives courses
app.get('/getCourse', function(req, res, next) {
    databaseModules.getCourses(req,res);
});
  
// Posts review to database
app.post('/createReview', (req, res) => {
 courseDatabase.createReview(req,res);
});

app.get('/user', (req, res) => {
    if (req.user) 
    {
        // User is logged in, send user information
        res.json({ uname: req.user.uname, email: req.user.email });
    } 
    else 
    {
        // User is not logged in
        res.status(401).send('Not logged in');
    }
});

// Takes user to appropriate account info
app.get('/account', (req, res) => {
    // Check if the user is logged in
    if (!req.user) 
    {
        res.redirect('/login');
        return;
    }

    // Check the user's role
    if (req.user.role === 'admin') 
    {
        // Direct to the admin account page
        res.sendFile(path.join(__dirname, 'public', 'html', 'adminAccount.html'));
    } 
    else if (!req.user.role) 
    {
        // Direct to the student account page is role is blank
        res.sendFile(path.join(__dirname, 'public', 'html', 'studentAccount.html'));
    } 
    else 
    {
        res.status(404).send('Error handling account');
    }
});

app.get('/userReviews',(req,res)=>{
    databaseModules. userReviews(req,res);
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
