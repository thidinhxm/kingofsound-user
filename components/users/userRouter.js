const express = require('express');
const router = express.Router();
const userController = require('./userControler');

router.get('/', userController.isLogin, userController.profile);
router.get('/profile', userController.isLogin, userController.profile);

module.exports = router;