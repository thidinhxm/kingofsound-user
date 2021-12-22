const express = require('express');
const router = express.Router();
const orderController = require('./orderController');

router.get('/', orderController.list);
router.get('/:order_id', orderController.detail);

module.exports = router;