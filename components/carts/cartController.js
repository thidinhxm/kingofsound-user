const cartService = require('./cartService');

exports.index =  async (req, res, next) => {
    try {
        const cart = req.session.cart;
        req.session.oldUrl = req.originalUrl;
        res.render('../components/carts/cartViews/cart', {cart});
    }
    catch(err) {
        next(err);
    }

}

exports.checkout = async (req, res, next) => {
    res.render('../components/carts/cartViews/checkout');
}