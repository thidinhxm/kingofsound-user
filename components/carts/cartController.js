const cartService = require('./cartService');
const orderService = require('../orders/orderService')
const voucherService = require('../vouchers/voucherService')

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
        const payment_status = req.body.payment=="CK"?"Đã thanh toán":"Chưa thanh toán";
        const voucher = await voucherService.getVoucher(req.body.voucher);
        const order = {
            user_id:user_id,
            receive_address:req.body.address,
            receive_phone: req.body.phone,
            voucher:voucher?req.body.voucher:null,
            cart_id:cart.cart_id,
            payment_status:payment_status
        };
        const newOrder = await orderService.create(order);
        const detailcart = await cartService.getDetailCart(cart.cart_id);
        detailcart.forEach(element => {
            orderService.createDetail({
                product_id:element.product_id,
                order_id:newOrder.order_id,
                quantity:element.quantity,
            })
        });
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