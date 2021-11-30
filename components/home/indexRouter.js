const express = require('express');
const router = express.Router();

const indexController = require('./indexController');
/* GET home page. */
router.get('/', indexController.index);

router.get('/checkout', indexController.checkout);

router.get('/login', indexController.login);

router.get('/register', indexController.register);

module.exports = router;

