// Admin Routes
const express = require('express');

const router = express.Router();

router.get('/admin', (req, res) => {
    if (req.isAuthenticated()) 
    {
        // Render admin dashboard
        res.send('Admin Dashboard');
    } 
    else 
    {
        res.redirect('/admin/login');
    }
});

router.get('/admin/login', (req, res) => {
    // res.send('Admin Login Page');
    // Render admin login HTML file
        res.sendFile(path.join(__dirname, 'public','html', 'admin', 'login.html'));

});

router.post('/admin/login', passport.authenticate('admin-local', {
    successRedirect: '/admin',
    failureRedirect: '/admin/login',
    failureFlash: true
}));

router.get('/admin/logout', (req, res) => {
    req.logout();
    res.redirect('/admin/login');
});

module.exports = router;
