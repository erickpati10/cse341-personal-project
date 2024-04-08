
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');
const swaggerDoc = require('./swagger.json');
const mongodb = require('./config/db/connect');
const { connect } = require('mongoose');



const port = process.env.PORT || 8080;
const server = express();

server
  .use(bodyParser.json())
  .use(cors())
  .use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc))
  .use(express.json())
  .use(express.urlencoded({ extended: true }));

  server.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, FETCH');
    next();
  });






server.use('/chef', require('./routes/chefs'));
server.use('/index', require('./routes/index'));
server.use('/recipes', require('./routes/recipes'));
server.use('/swagger', require('./routes/swagger'));

server.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});


mongodb();


server.listen(port);
module.exports = server;
