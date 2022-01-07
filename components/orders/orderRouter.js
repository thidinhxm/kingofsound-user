const express = require('express');
const router = express.Router();

const orderController = require('./orderController');
const userController = require('../users/userController');

router.get('/:order_id', userController.isLogin, orderController.detail);
router.get('/', userController.isLogin, orderController.list);
router.post('/review',orderController.review);

module.exports = router;