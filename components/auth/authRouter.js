const express = require('express');
const router = express.Router();
const passport = require('./passport')
const authController = require('./authController');

router.get('/login', authController.login);

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login?message=Invalid username or password',
    // failureFlash: true
}), (req, res, next) => {
    console.log('passport auth success');
    if (req.user) {
        res.redirect('/');
    }
    else {
        res.redirect('/login');
    }
});

router.get('/profile', authController.profile);

router.get('/register', authController.register);

router.post('/register', authController.registerPost);


module.exports = router;
