const express = require('express');
const session = require('express-session'); 
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const path = require('path');


const app = express();
const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static('public', { index: 'html/index.html' }));

// Middleware
// app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'secret', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


// Dummy admin user (replace with database integration)
const adminUser = {
    id: 1,
    username: 'admin',
    password: 'adminpassword'
};

// Passport Local Strategy for admin authentication
passport.use('admin-local', new LocalStrategy((username, password, done) => {
    if (username === adminUser.username && password === adminUser.password) {
        return done(null, adminUser);
    } else {
        return done(null, false, { message: 'Incorrect username or password' });
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    if (id === adminUser.id) {
        done(null, adminUser);
    } else {
        done(null, false);
    }
});

// Admin Routes
app.get('/admin', (req, res) => {
    if (req.isAuthenticated()) {
        // Render admin dashboard
        res.send('Admin Dashboard');
    } else {
        res.redirect('/admin/login');
    }
});

app.get('/admin/login', (req, res) => {
    // res.send('Admin Login Page');
    // Render admin login HTML file
        res.sendFile(path.join(__dirname, 'public','html', 'admin', 'login.html'));

});


app.post('/admin/login', passport.authenticate('admin-local', {
    successRedirect: '/admin',
    failureRedirect: '/admin/login',
    failureFlash: true
}));

app.get('/admin/logout', (req, res) => {
    req.logout();
    res.redirect('/admin/login');
});


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

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
