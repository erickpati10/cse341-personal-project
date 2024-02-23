const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const mongodb = require('./db/connect');

const oauthRoutes = require('./routes/oauth');

const port = process.env.PORT || 8080;
const server = express();

server
  .use(bodyParser.json())
  .use(session({ secret: process.env.SESSION_SECRET, resave: true, saveUninitialized: true }))
  .use(passport.initialize())
  .use(passport.session())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  });

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: 'https://cse341-personal-project-jjxi.onrender.com/auth/login'
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);
server.use('/auth', oauthRoutes);
server.use('/chef', require('./routes/chefs'));
server.use('/index', require('./routes/index'));
server.use('/recipes', require('./routes/recipes'));
server.use('/swagger', require('./routes/swagger'));

mongodb.initDb((err) => {
  if (err) {
    console.error(err);
  } else {
    server.listen(port, () => {
      console.log(`Connected to DB and listening on ${port}`);
    });
  }
});
