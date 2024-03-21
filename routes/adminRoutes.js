// adminRoutes.js

const express = require('express');
const adminController = require('../controllers/adminController');
const router = express.Router();

// all of the suspended accounts
router.get('/admin/suspendedUsers', adminController.suspended);

// Unsuspend account
router.put('/admin/unsuspendUser/:uname', adminController.unsuspend);

// display a reported review
router.get('/reported-reviews', adminController.displayReports);

// suspend account
router.put('/admin/suspendUser/:uname',adminController.suspend);

module.exports = router;