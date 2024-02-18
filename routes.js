const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const express = require('express');

const route = express.Router();

route.get('/', homeController.index);

route.get('/register', loginController.register);
route.get('/login', loginController.index);

module.exports = route;
