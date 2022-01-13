const express = require('express');
const router = express.Router();

const orderController = require('./orderController');
const userController = require('../users/userController');
const reviewAPI = require('../reviews/reviewAPI')

router.get('/:order_id', userController.isLogin, orderController.detail);
router.get('/', userController.isLogin, orderController.list);
router.post('/review',userController.isLogin,orderController.review);
router.post('/getreview',userController.isLogin,reviewAPI.getReview);
router.post('/delete',userController.isLogin,orderController.delete);

module.exports = router;