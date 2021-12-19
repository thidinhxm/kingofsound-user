const express = require('express');
const router = express.Router();
const userController = require('./userController');

router.get('/', userController.isLogin, userController.profile);
router.get('/profile', userController.isLogin, userController.profile);
router.get('/cart/:user_id', userController.cart)
router.get('/checkout/:user_id', userController.checkout)
router.get('/editprofile', userController.editProfile)
router.get('/changepassword', userController.changePassword)

module.exports = router;