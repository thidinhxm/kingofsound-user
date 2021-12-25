const express = require('express');
const router = express.Router();

const cartController = require('./cartController')
const cartAPI = require('./cartAPI')
router.get('/', cartController.index);

// router.get('/checkout', cartController.checkout);

router.post('/add', cartAPI.addToCart);
router.delete('/:id/delete', cartAPI.removeFromCart);
router.patch('/:id/update', cartAPI.changeQuantity);
module.exports = router;