// adminRoutes.js

const express = require('express');
const adminController = require('../controllers/adminController');
const router = express.Router();

// all of the suspended accounts
router.get('/admin/suspendedUsers', adminController.suspended);

// Unsuspend account
router.put('/admin/unsuspendUser/:uname', adminController.unsuspend);

// display a reported review
router.get('/admin/reported-reviews', adminController.displayReports);

// suspend account
router.put('/admin/suspendUser/:uname',adminController.suspend);

// delete a reported review
router.delete('/admin/deleteReview/:id', adminController.deleteReview);

// dismiss a reported review
router.put('/admin/dismissReport/:reviewId', adminController.dismissReport);

module.exports = router;