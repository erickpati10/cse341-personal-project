const express = require('express');
const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;

const router = express.Router();

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

passport.use(
  new GitHubStrategy(
    {
      clientID: '9f99e9e155055bf30bff',
      clientSecret: '0334a70e707cb8665df96838306a8ed19ee69546',
      callbackURL:
        'https://cse341-personal-project-jjxi.onrender.com/api-docs/callback/auth/login/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);

// Routes
router.get('/login', passport.authenticate('github'));

router.get(
  '/login/callback',
  passport.authenticate('github', {
    successRedirect: '/',
    failureRedirect: '/login'
  })
);

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
