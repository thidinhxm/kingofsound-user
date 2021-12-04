const express = require('express');
const router = express.Router();

const authController = require('./authController');

router.get('/login', authController.login);

router.get('/register', authController.register);

router.post('/register', authController.registerPost);

// router.post('/login', authController.loginPost);

module.exports = router;
