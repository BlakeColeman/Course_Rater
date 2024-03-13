//reviewController.js

// This will have the controller that displays the correct reviews for a course after searching

const express = require('express');

const router = express.Router();

router.get('/reviews/:id', (req, res) => {
    const id = req.params.id;
    Review.findById(id)
    .then(result => {
        res.render('reviews', {review: result, title: 'Reviews'});
    })
    .catch(err => {
        console.log(err);
    })
})