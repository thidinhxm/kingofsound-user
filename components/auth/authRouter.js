const express = require('express');
const router = express.Router();
const passport = require('./passport')
const authController = require('./authController');

router.get('/login', authController.login);

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));

router.get('/register', authController.register);

router.post('/register', authController.registerPost);

router.get('/logout', authController.logout);
module.exports = router;
