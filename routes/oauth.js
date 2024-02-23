const express = require('express');
const passport = require('passport');

const router = express.Router();

// GitHub authentication route
router.get('/login', passport.authenticate('github'));

// GitHub callback route after successful authentication
router.get(
  '/login/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication, redirect to the home page or any desired route
    res.redirect('/');
  }
);

// Logout route
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

// Route to check if the user is authenticated
router.get('/status', (req, res) => {
  res.json({ authenticated: req.isAuthenticated(), user: req.user });
});

module.exports = router;
