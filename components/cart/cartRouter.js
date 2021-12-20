const express = require('express');
const router = express.Router();
const cartController = require('./cartController')

router.get('/',cartController.cart);
router.get('/checkout',cartController.checkout);

module.exports = router;