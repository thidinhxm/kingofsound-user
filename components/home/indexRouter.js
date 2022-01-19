const express = require('express');
const router = express.Router();

const indexController = require('./indexController');

router.get('/', indexController.index);
router.get('/about', indexController.about);
module.exports = router;

