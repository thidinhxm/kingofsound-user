const {models} = require('../../models');
const cartService = require('./cartService');
const {getOrCreateCart} = require('./cartController');

exports.addToCart = async (req, res, next) => {
    try {
        const {product_id} = req.body;
        const cart_id = req.session.cart.cart_id;
        await cartService.updateCart(cart_id, product_id);
        req.session.cart = await getOrCreateCart(req.session.user_id);
        console.log('cart', req.session.cart);
        res.json({
            success: true,
            cart: req.session.cart
        })
    }
    catch(err) {
        next(err);
    }
}