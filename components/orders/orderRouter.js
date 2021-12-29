const express = require('express');
const router = express.Router();

const orderController = require('./orderController');
const userController = require('../users/userController');

router.get('/', userController.isLogin, orderController.list);
router.get('/:order_id', userController.isLogin, orderController.detail);

module.exports = router;