// adminRoutes.js

const express = require('express');
const adminController = require('../controllers/adminController');
const router = express.Router();

// Route to display all suspended user accounts
router.get('/admin/suspendedUsers', adminController.suspended);

// Route to unsuspend a user account
router.put('/admin/unsuspendUser/:uname', adminController.unsuspend);

// Route to display reported reviews
router.get('/admin/reported-reviews', adminController.displayReports);

// Route to suspend a user account
router.put('/admin/suspendUser/:uname',adminController.suspend);

// Route to delete a reported review
router.delete('/admin/deleteReview/:id', adminController.deleteReview);

// Route to dismiss a reported review
router.put('/admin/dismissReport/:reviewId', adminController.dismissReport);

module.exports = router;