const orderSevice = require('./orderService');
const voucherService = require('../vouchers/voucherService');
const reviewService = require('../reviews/reviewService')
exports.list = async (req, res, next) => {
    try {
        const message = req.query.message;
        const user = req.user;
        const user_id = user.user_id;
        const listOrder =  await orderSevice.listOrder(user_id); 
        res.render('../components/orders/orderViews/listOrder',{ listOrder,message });
    }
    catch (error) {
        next(error);
    }
}
exports.detail = async (req, res, next) => {
    try {
        const order_id = req.params.order_id;
        const detailOrder = await orderSevice.detailOrder(order_id);
        const order =  await orderSevice.order(order_id);
        const voucher = await voucherService.getVoucher(order.voucher);
        res.render('../components/orders/orderViews/detailOrder',{ detailOrder, order, voucher});
    }
    catch (error) {
        next(error);
    }
}

exports.review = async (req,res,next) =>
{
    try
    {
    const product_id = req.body.product_id;
    const order_id = req.body.order_id;
    const content = req.body.review;
    const rating = req.body.star;
    console.log({product_id:product_id,content:content,rating:rating,user_id:req.user.user_id});
    const review = await reviewService.addReview({product_id:product_id,content:content,rating:rating,user_id:req.user.user_id});
    const review_id = review.review_id;
    await orderSevice.reviewDetailOrder(order_id,product_id, review_id);
    res.redirect('/orders/' + order_id);
    }
    catch (error) {
    next(error);
    }
}