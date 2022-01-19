const cartService = require('./cartService');

exports.addToCart = async (req, res, next) => {
    try {
        const {product_id, quantity} = req.body;
        const cart_id = req.session.cart.cart_id;
        await cartService.addToCart(cart_id, product_id, quantity);
        if (req.user) {
            req.session.cart = await cartService.getUserCart(req.user.user_id);
            
        }
        else {
            req.session.cart = await cartService.getUnauthCart(req.session.unauth_id);
        }
        
        res.locals.cart = req.session.cart;
        res.json({
            success: true,
            cart: req.session.cart
        })
    }
    catch(err) {
        res.json({
            success: false,
        })
    }
}

exports.removeFromCart = async (req, res, next) => {
    try {
        const product_id = req.params.id;
        const cart_id = req.session.cart.cart_id;
        await cartService.removeFromCart(cart_id, product_id);
        if (req.user) {
            req.session.cart = await cartService.getUserCart(req.user.user_id);
        }
        else {
            req.session.cart = await cartService.getUnauthCart(req.session.unauth_id);
        }
        res.json({
            success: true,
            cart: req.session.cart
        })
    }
    catch(err) {
        res.json({
            success: false,
        })
    }
}

exports.changeQuantity = async (req, res, next) => {
    try {
        const {product_id, quantity} = req.body;
        const cart_id = req.session.cart.cart_id;
        await cartService.changeQuantity(cart_id, product_id, quantity);
        if (req.user) {
            req.session.cart = await cartService.getUserCart(req.user.user_id);
        }
        else {
            req.session.cart = await cartService.getUnauthCart(req.session.unauth_id);
        }
        
        res.json({
            success: true,
            cart: req.session.cart
        })
    }
    catch(err) {
        res.json({
            success: false,
        })
    }
}