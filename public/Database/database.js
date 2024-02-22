import pkg from 'sqlite3';
const {sqlite3} = pkg;

let db = new sqlite3.Database('./db/UofRCourseRater', sqlite3.OPEN_READWRITE, (err) => {
    if (err) 
    {
      console.error(err.message);
    }
    
    console.log('Connected to the chinook database.');
    
  });
