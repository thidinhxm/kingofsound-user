const cartService = require('./cartService');

exports.addToCart = async (req, res, next) => {
    try {
        const {product_id} = req.body;
        if (req.user) {
            const cart_id = req.user.cart.cart_id;
            await cartService.addToCart(cart_id, product_id);
            req.user.cart = await cartService.getUserCart(req.user.user_id);
        }
        else {
            const cart_id = req.session.cart.cart_id;
            await cartService.addToCart(cart_id, product_id);
            req.session.cart = await cartService.getUnauthCart(cart_id);

        }
        res.json({
            success: true,
            cart: req.user ? req.user.cart : req.session.cart
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
        if (req.user) {
            const cart_id = req.user.cart.cart_id;
            await cartService.removeFromCart(cart_id, product_id);
            req.user.cart = await cartService.getUserCart(req.user.user_id);
        }
        else {
            const cart_id = req.session.cart.cart_id;
            await cartService.removeFromCart(cart_id, product_id);
            req.session.cart = await cartService.getUnauthCart(cart_id);
        }
        res.json({
            success: true,
            cart: req.user ? req.user.cart : req.session.cart
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
        if (req.user) {
            const cart_id = req.user.cart.cart_id;
            await cartService.changeQuantity(cart_id, product_id, quantity);
            req.user.cart = await cartService.getUserCart(req.user.user_id);
        }
        else {
            const cart_id = req.session.cart.cart_id;
            await cartService.changeQuantity(cart_id, product_id, quantity);
            req.session.cart = await cartService.getUnauthCart(cart_id);
        }
        res.json({
            success: true,
            cart: req.user ? req.user.cart : req.session.cart
        })
    }
    catch(err) {
        res.json({
            success: false,
        })
    }
}