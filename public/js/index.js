// index.js
const express = require('express'); 
const app = express(); 
const sqlite3 = require('sqlite3'); 

let db = new sqlite3.Database('./db/UofRCourseRater', sqlite3.OPEN_READWRITE, (err) => {
    if (err) 
    {
      console.error(err.message);
    }
    console.log('Connected to the chinook database.');
  });

console.log('Index page loaded.');

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM content loaded.');
});
