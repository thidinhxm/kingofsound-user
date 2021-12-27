const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

const passport = require('./passport')
const authController = require('./authController');
const cartService = require('../carts/cartService');
const authAPI = require('./authAPI');

router.get('/login', authController.login);

router.post('/login', passport.authenticate('local'), 
async function(req, res, next) {
    try {
        const cartUser = await cartService.getUserCart(req.user.user_id);
        await cartService.moveToCartUser(cartUser.cart_id, req.session.cart.cart_id);
        req.session.cart = await cartService.getUserCart(req.user.user_id);
        res.locals.cart = req.session.cart;
        res.redirect(req.session.oldUrl);
    }
    catch(err) {
        next(err);
    }
});

router.get('/register', authController.register);

router.post('/register', authController.registerPost);

router.get('/logout', authController.logout);

router.post('/api/check-exists-account', authAPI.checkExistsAccount);

router.post('/api/check-user', authAPI.checkUser);

router.get('/verify', authController.verify);

router.get('/verified', (req, res) => {
    res.render('../components/auth/authViews/verify');
});
module.exports = router;
