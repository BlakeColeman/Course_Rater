const express = require('express');
const session = require('express-session'); 
const bodyParser = require('body-parser');
const path = require('path');
const studentRoutes = require('./routes/studentRoutes');
const adminRoutes = require('./routes/adminRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const loginSignupRoutes = require('./routes/loginSignupRoutes');
const loginController = require('./public/controller/loginController');

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

app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, 'public','view', 'index.html'));
});

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

// Controllers
// will eventually remove this line
app.use(loginController); 

// blog routes
app.use(studentRoutes);
app.use(adminRoutes);
app.use(reviewRoutes);
app.use(loginSignupRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
