const express = require('express');
const router = express.Router();
const userController = require('./userController');

router.get('/', userController.isLogin, userController.profile);
router.get('/profile', userController.isLogin, userController.profile);
router.get('/editprofile', userController.editProfile)
router.get('/changepassword', userController.changePassword)
router.post('/editprofile', userController.updateUser);
router.post('/changepassword', userController.updatePassword)

module.exports = router;