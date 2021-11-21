const express = require('express');
const router = express.Router();

const indexController = require('./indexController');
/* GET home page. */
router.get('/', indexController.index);

router.get('/checkout', (req, res, next) => {
	res.render('checkout')
})

router.get('/blank', function(req, res, next) {
	res.render('blank')
})

router.get('/login', (req, res, next) => {
	res.render('login')
})

router.get('/register', (req, res, next) => {
	res.render('register')
})
module.exports = router;

