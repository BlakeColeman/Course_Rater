const express = require('express');

const router = express.Router();

router.post('/createReview', (req, res) => {
    const review = new Review(req.body);

    review.save()
        .then((result) => {
            res.redirect('/index2');
        })
        .catch((err) => {
            console.log(err);
        })
})
