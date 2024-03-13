const express = require('express');
const session = require('express-session'); 
const bodyParser = require('body-parser');
const path = require('path');
const loginController = require('./public/controller/loginController');
const signupController = require('./public/controller/signupController');
const courseDatabase = require('./database/databaseModules');
const databaseModules = require('./database/databaseModules');

// import { SignupForm} from "./signup.js";

const app = express();
const port = 3000;

// Middleware
// Serve static files from the 'public' directory
app.use(express.static('public', { index: 'view/index.html' }));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
    secret: 'your-secret-key',
    resave: true,
    saveUninitialized: true
}));


// Controllers
app.use(signupController); //signup Controllers
app.use(loginController); // login Controllers


app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, 'public','view', 'index.html'));
});

//Deleted index2 route 
//will delete index2file after a few days
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public','view', 'login.html'));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'public','view', 'signup.html'));
});

app.get('/createReview', (req, res) => {
    res.sendFile(path.join(__dirname, 'public','view', 'createReview.html'));
});

app.get('/editReview', (req, res) => {
    res.sendFile(path.join(__dirname, 'public','view', 'editReview.html'));
});

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
        res.sendFile(path.join(__dirname, 'public', 'view', 'adminAccount.html'));
    } 
    else if (!req.user.role) 
    {
        // Direct to the student account page is role is blank
        res.sendFile(path.join(__dirname, 'public', 'view', 'studentAccount.html'));
    } 
    else 
    {
        res.status(404).send('Error handling account');
    }
});

app.get('/userReviews',(req,res)=>{
    databaseModules.userReviews(req,res);
});

// details for a singular review on the edit review page
app.get('/reviewDetails/:id', (req, res) => {
    databaseModules.reviewDetails(req,res);
});

// delete a review on the edit review page
app.delete('/deleteReview/:id', (req, res) => {
    databaseModules.deleteReview(req,res);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
