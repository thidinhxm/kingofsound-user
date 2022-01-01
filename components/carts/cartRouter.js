const express = require('express');
const router = express.Router();

const cartController = require('./cartController');
const cartAPI = require('./cartAPI');
const voucherAPI = require('../vouchers/voucherAPI');
const userController = require('../users/userController');

router.get('/', cartController.index);
router.get('/checkout', userController.isLogin, cartController.checkout);

router.post('/checkout',cartController.createOrder);
router.post('/add', cartAPI.addToCart);
router.delete('/:id/delete', cartAPI.removeFromCart);
router.patch('/:id/update', cartAPI.changeQuantity);
router.post('/checkout/voucher',voucherAPI.checkValidVoucher)

module.exports = router;