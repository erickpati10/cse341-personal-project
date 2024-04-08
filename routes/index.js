const express = require('express');
const router = express.Router();
const controller = require('../controllers/index');
const { auth, requiresAuth } = require('express-openid-connect');
const config = require('../config/auth0');




router.use(auth(config));

router.get('/', controller.getHome);
router.use('/', requiresAuth(), require('./swagger'));
router.use('/recipes', requiresAuth(), require('./recipes'));
router.use('/chefs', requiresAuth(), require('./chefs'));

module.exports = router;
