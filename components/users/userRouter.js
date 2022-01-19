const express = require('express');
const router = express.Router();
const userController = require('./userController');

router.get('/', userController.isLogin, userController.profile);
router.get('/profile', userController.isLogin, userController.profile);
router.get('/editprofile',userController.isLogin, userController.editProfile)
router.get('/changepassword', userController.isLogin,userController.changePassword)
router.post('/editprofile', userController.isLogin,userController.updateUser);
router.post('/changepassword', userController.isLogin,userController.updatePassword)

module.exports = router;