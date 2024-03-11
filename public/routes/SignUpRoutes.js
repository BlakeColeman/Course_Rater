const express = require('express');
const router = express.Router();
const path = require('path');
const courseDatabase = require('../../database/databaseModules')

 // Create new user
 router.post('/createUser', function(req,res)
 {
    courseDatabase.createUser(req,res);
 }); 

  

router.post('/checkUsername', (req, res) => 
{
  courseDatabase.checkUsername(req,res);
});



router.post('/checkEmail',(req,res) => 
{
  courseDatabase.checkEmail(req,res);
});


module.exports = router;