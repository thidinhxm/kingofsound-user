const express = require('express');
const router = express.Router();
const userController = require('./userController');

router.get('/', userController.isLogin, userController.profile);
router.get('/profile', userController.isLogin, userController.profile);
router.get('/cart/', userController.cart)
router.get('/checkout/', userController.checkout)
router.get('/editprofile', userController.editProfile)
router.get('/changepassword', userController.changePassword)
router.put('/editprofile', userController.updateUser);
router.put('/changepassword', userController.updatePassword)

module.exports = router;