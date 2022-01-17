const cartService = require('./cartService');
const orderService = require('../orders/orderService')

exports.index = async (req, res, next) => {
    try {
        const cart = req.session.cart;
        req.session.oldUrl = req.originalUrl;
        res.render('../components/carts/cartViews/cart', { cart });
    }
    catch (err) {
        next(err);
    }

}

exports.checkout = async (req, res, next) => {
    const cart = req.session.cart;
    res.render('../components/carts/cartViews/checkout', { cart });
}

exports.createOrder = async (req, res, next) => {
    try {
        const user_id = req.user.user_id;
        const cart = await cartService.getUserCart(user_id);
        const payment_status = req.body.payment=="CK" ? "Đã thanh toán" : "Chưa thanh toán";
        const voucher = (req.body.voucher == "") ? null : req.body.voucher;
        const order = {
            user_id: user_id,
            receive_address : req.body.address,
            receive_phone : req.body.phone,
            voucher : voucher,
            cart_id : cart.cart_id,
            payment_status : payment_status
        };

        const [newOrder, detailcart] = await Promise.all([orderService.create(order), cartService.getDetailsInCart(cart.cart_id)]);
        await Promise.all(detailcart.products.map(async (detail) => {
            await orderService.createDetail({
                order_id: newOrder.order_id,
                product_id: detail.product_id,
                quantity: detail.quantity,
                subtotal: detail.subtotal,
                voucher: voucher
            });
        }));
        
        await cartService.deleteDetailCart(cart.cart_id);
        req.session.cart = await cartService.getDetailsInCart(cart.cart_id);
        req.session.cart.cart_id = cart.cart_id;
        req.session.save(function(err) {console.log(err);})
        res.redirect('/orders?message=true');
    }
    catch (err) {
        next(err);
    }
}