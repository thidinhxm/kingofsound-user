const cartService = require('./cartService');

exports.getOrCreateCart = async(user_id) => {
    let cart = await cartService.getCart(user_id);
    if (!cart) {
        cart = await cartService.createCart(user_id);
    }
    else {
        cart.detailCart = await cartService.getDetailCart(cart.cart_id);
    }
    return cart;
}

exports.index =  async(req, res) => {
   const cart = req.session.cart;
    res.render('../components/carts/cartViews/cart', {cart});

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