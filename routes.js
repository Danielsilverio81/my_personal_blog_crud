const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const express = require('express');

const route = express.Router();

route.get('/', homeController.index);

route.get('/register', loginController.register);
route.get('/login', loginController.index);
route.get('/login/page', loginController.index);
route.get('/login/logout', loginController.processLogout);
route.post('/login/register', loginController.processRegister);
route.post('/login/sign', loginController.processLogin);

module.exports = route;
