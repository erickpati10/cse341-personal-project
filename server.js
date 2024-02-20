const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');

const port = process.env.PORT || 8080;
const server = express();

server
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/', require('./routes'));

mongodb.initDb((err) => {
  if (err) {
    console.error(err);
  } else {
    server.listen(port, () => {
      console.log(`Connected to DB and listening on ${port}`);
    });
  }
});
