const express = require('express');
const router = express.Router();

const cartController = require('./cartController')
const cartAPI = require('./cartAPI')
router.get('/', cartController.index);

// router.get('/checkout', cartController.checkout);

router.post('/api/add-to-cart', cartAPI.addToCart);
router.delete('/:id/delete', cartAPI.removeFromCart);
module.exports = router;