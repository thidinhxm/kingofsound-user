const express = require('express');
const router = express.Router();

const passport = require('./passport')
const authController = require('./authController');
const cartService = require('../carts/cartService');
const authAPI = require('./authAPI');

router.get('/login', authController.login);

router.post('/login', passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: true
}), async function(req, res, next) {
    try {
        const cartUser = await cartService.getUserCart(req.user.user_id);
        await cartService.moveToCartUser(cartUser.cart_id, req.session.cart.cart_id);
        req.session.cart = await cartService.getUserCart(req.user.user_id);
        res.locals.cart = req.session.cart;
        res.redirect(req.session.oldUrl || '/');
    }
    catch(err) {
        next(err);
    }
});

router.get('/register', authController.register);

router.post('/register', authController.registerPost);

router.get('/logout', authController.logout);

router.post('/api/check-exists-account', authAPI.checkExistsAccount);

router.get('/send', authController.sendMailToVerifyUser);

router.get('/verify', authController.verify);

router.get('/forgot-password', authController.forgotPassword);

router.post('/forgot-password', authController.forgotPasswordPost);

router.get('/forgot-password-authentication', authController.forgotPasswordAuthentication);

router.get('/reset-password', authController.resetPassword);

router.post('/reset-password', authController.resetPasswordPost);

module.exports = router;
