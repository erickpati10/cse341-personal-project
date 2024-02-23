const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get('/login', passport.authenticate('github'));

router.get(
  '/login/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/');
  }
);

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.get('/status', (req, res) => {
  res.json({ authenticated: req.isAuthenticated(), user: req.user });
});

module.exports = router;
