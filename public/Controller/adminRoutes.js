// Admin Routes
const express = require('express');
var passport = require('passport');
const router = express.Router();

// router.get('/admin', (req, res) => {
//     if (req.isAuthenticated()) 
//     {
//         // Render admin dashboard
//         res.send('Admin Dashboard');
//     } 
//     else 
//     {
//         res.redirect('/admin/login');
//     }
// });

// router.get('/admin/login', (req, res) => {
//     // res.send('Admin Login Page');
//     // Render admin login HTML file
//         res.sendFile(path.join(__dirname, 'public','html', 'admin', 'login.html'));

// });

// router.get('/adminAccount', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public','html', 'adminAccount.html'));
// });

// router.post('/admin/login', passport.authenticate('admin-local', {
//     successRedirect: '/admin',
//     failureRedirect: '/admin/login',
//     failureFlash: true
// }));

// router.get('/admin/logout', (req, res) => {
//     req.logout();
//     res.redirect('/admin/login');
// });


module.exports = router;

//wikll be used later
// // Dummy admin user (replace with database integration)
// const adminUser = {
//     id: 1,
//     username: 'admin',
//     password: 'adminpassword'
// };

// // Passport Local Strategy for admin authentication
// passport.use('admin-local', new LocalStrategy((username, password, done) => {
    
//     if (username === adminUser.username && password === adminUser.password) 
//     {
//         return done(null, adminUser);
//     } 
//     else 
//     {
//         return done(null, false, { message: 'Incorrect username or password' });
//     }
// }));

// passport.serializeUser((user, done) => {
//     done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
    
//     if (id === adminUser.id) 
//     {
//         done(null, adminUser);
//     } 
//     else 
//     {
//         done(null, false);
//     }
// });
