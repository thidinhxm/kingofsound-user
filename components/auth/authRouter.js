const express = require('express');
const router = express.Router();

const passport = require('./passport')
const authController = require('./authController');
const authAPI = require('./authAPI');

router.get('/login', authController.login);

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}), );

router.get('/register', authController.register);

router.post('/register', authController.registerPost);

router.get('/logout', authController.logout);

router.post('/api/check-exists-account', authAPI.checkExistsAccount);

router.post('/api/check-user', authAPI.checkUser);

module.exports = router;
