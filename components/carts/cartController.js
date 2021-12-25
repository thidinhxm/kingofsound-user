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

// exports.checkout = async (req, res) => {
// const user = req.user;
// const id = user.user_id; 
// let total = 0;
// const detailCart =  await cartService.getCart(id);
// for(const detail in detailCart)
//    {
//     total = total + detailCart.subtotal;
//    }
// res.render('../components/cart/cartViews/checkout', {detailCart, total})
// }