const express = require('express');

const router = express.Router();

router.get('/student/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public','view', 'student', 'login.html'));

});

router.get('/student/logout', (req, res) => {
    req.logout();
    res.redirect('/student/login');
});

// Reviews on the account page
router.get('/student/studentAccount', (req, res) => {
    const username = req.user.username; 
    db.all('SELECT * FROM reviews WHERE uname = ?', [username], (err, rows) => {
        if (err) 
        {
            console.error('Error retrieving reviews:', err);
            res.status(500).send('Error retrieving reviews.');
            return;
        }
        // Pass the retrieved reviews data 
        res.render('studentAccount', { reviews: rows });
    });
});

module.exports = router;
