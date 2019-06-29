var express = require('express');
var router = express.Router();
// controllers
var loginController = require('../controller/login.controller');

// Login Page rendering..
router.get('/', function(req, res) {
  res.render('login');
});

// User login method
router.post('/login', loginController.login);
router.post('/testlogin', loginController.logintest);

module.exports = router;
