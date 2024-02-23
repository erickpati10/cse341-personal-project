// main server file (e.g., server.js)
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
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

//routes
server.use('/auth', require('./routes/authRoutes'));
server.use('/chef', require('./routes/chef'));
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
