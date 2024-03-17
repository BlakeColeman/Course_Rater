// adminRoutes.js

const express = require('express');
const adminController = require('../controllers/adminController');
const router = express.Router();


// all of the suspended accounts
router.get('/admin/suspendedUsers', adminController.suspended);

// Unsuspend account
router.put('/admin/unsuspendUser/:uname', adminController.unsuspend);

module.exports = router;