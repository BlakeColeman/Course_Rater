const express = require('express');

const router = express.Router();

router.get('/student/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public','html', 'student', 'login.html'));

});

router.get('/student/logout', (req, res) => {
    req.logout();
    res.redirect('/student/login');
});

module.exports = router;