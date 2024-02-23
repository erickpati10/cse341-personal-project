// main server file (e.g., server.js)
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const mongodb = require('./db/connect');

const port = process.env.PORT || 8080;
const server = express();

server
  .use(bodyParser.json())
  .use(session({ secret: 'your_session_secret', resave: true, saveUninitialized: true }))
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

// Update the require statement to use 'oauth.js'
const oauthRoutes = require('./routes/oauth');

server.use('/auth', oauthRoutes); // Use the variable name 'oauthRoutes'

// Include your existing routes
server.use('/chef', require('./routes/chefs'));
server.use('/index', require('./routes/index'));
server.use('/recipes', require('./routes/recipes'));
server.use('/swagger', require('./routes/swagger'));

mongodb.initDb((err) => {
  if (err) {
    console.error(err);
  } else {
    // Start the server
    server.listen(port, () => {
      console.log(`Connected to DB and listening on ${port}`);
    });
  }
});
