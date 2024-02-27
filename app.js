const express = require('express');
const session = require('express-session'); 
const bodyParser = require('body-parser');
const path = require('path');
const sqlite3 = require('sqlite3').verbose(); 
const adminRoutes = require('./public/routes/adminRoutes');
const studentRoutes = require('./public/routes/studentRoutes');
const loginRoutes = require('./public/routes/LoginRoutes');
const signupRoutes = require('./public/routes/SignUpRoutes');

// import { SignupForm} from "./signup.js";

const app = express();
const port = 3000;

//connecting to the database
let db = new sqlite3.Database('./public/database/UofRCourseRater', (err) => {
    if (err) 
    {
      console.error(err.message);
    }
    else
    {
        console.log('Connected to the CourseRater database.');
    }
  });


// Middleware
// Serve static files from the 'public' directory
app.use(express.static('public', { index: 'html/index.html' }));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
    secret: 'your-secret-key',
    resave: true,
    saveUninitialized: true
}));


// Routes
app.use(adminRoutes);// Admin Routes
app.use(studentRoutes); // Student Routes
app.use(signupRoutes); //signup routes
app.use(loginRoutes); //login routes


app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, 'public','html', 'index.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public','html', 'login.html'));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'public','html', 'signup.html'));
});

app.get('/index2', (req, res) => {
    res.sendFile(path.join(__dirname, 'public','html', 'index2.html'));
});

app.get('/studentAccount', (req, res) => {
    res.sendFile(path.join(__dirname, 'public','html', 'studentAccount.html'));
});

app.get('/createReview', (req, res) => {
    res.sendFile(path.join(__dirname, 'public','html', 'createReview.html'));
});


// app.get('/user', (req, res) => {
//     if (req.user) {
//         // User is logged in, send user information
//         res.json({ username: req.user.username, email: req.user.email });
//     } else {
//         // User is not logged in
//         res.status(401).send('Not logged in');
//     }
// });

  app.post('/createReviews',(req,res) =>
  {
    var {uname} = req.body.uname;
    var {cname} = req.body.cname;
    var {cid} = req.body.cid;
    var {rdesc} = req.body.rdesc;
    var {crating} = req.body.crating;
    var {flags} = req.body.flags;
    var sql = 'INSERT INTO reviews (cname, cid, rdesc, crating, flags,uname) Values(?,?,?,?,?,?)';
    db.serialize(()=>{
        db.run(sql,[uname,cname,cid,rdesc,crating,flags], function(err)
    {
        if (err) 
        {
            return console.log(err.message);
        }
        })
    })
});



    // search for a course
app.get('/search', (req, res) => {
        const { cname } = req.query; // Extracting 'cname' from the query string
        
        const sql = 'SELECT * FROM courses WHERE cname LIKE ?';
        
        db.all(sql, [cname], (err, rows) => {
            if (err) {
                console.error(err.message);
                res.status(500).send('Internal Server Error');
                return;
            }
            
            if (rows.length === 0) {
                // Course doesn't exist, send a 404 Not Found response
                res.status(404).send('Course not found');
            } else {
                // Course found, send the list of matching courses
                res.sendFile(path.join(__dirname, 'public','html', 'reviewpage.html'));

            }
        });
});
    
    // Retrives courses
app.get('/getCourse', function(req, res, next) {
    const { cname } = req.query;

    const sql = 'SELECT * FROM courses WHERE cname LIKE ? LIMIT 10'; // limit the number of courses shown
    
    const searchQuery = '%' + cname + '%';

    db.all(sql, [searchQuery], (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Internal Server Error');
            return;
        }

        if (rows.length === 0) {
            // Course doesn't exist, send a 404 Not Found response
            res.status(404).send('Course not found');
        } else {
            // Course found, send the list of matching courses
            res.status(200).json(rows);
        }
    });
});


app.get('/profile', (req, res) => {
    // If user is authenticated, req.user will contain the user information
    if (req.user) {
        res.send('Welcome, ' + req.user.uname);
    } else {
        res.redirect('/login'); // Redirect to login page if user is not authenticated
    }
});

// Takes user to appropriate account info
app.get('/account', (req, res) => {
    // Check if the user is logged in
    if (!req.user) {
        res.redirect('/login');
        return;
    }

    // Check the user's role
    if (req.users.role === 'admin') {
        // Render the admin account page
        res.sendFile(path.join(__dirname, 'public', 'html', 'adminAccount.html'));
    } else if (req.users.role === 'student') {
        // Render the student account page
        res.sendFile(path.join(__dirname, 'public', 'html', 'studentAccount.html'));
    } else {
        res.status(404).send('Error');
    }
});





app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
