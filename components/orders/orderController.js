const orderSevice = require('./orderService');
const voucherService = require('../vouchers/voucherService');
const reviewService = require('../reviews/reviewService')
const itemPerPage = 5
exports.list = async (req, res, next) => {
    try {
        const user = req.user;
        const cancel = req.query.cancel;
        const user_id = user.user_id;
        const status = req.query.status?req.query.status:"Đang chờ xử lý";
        const page = !isNaN(req.query.page) && req.query.page > 0 ? req.query.page - 1 : 0;
        const listOrder = await orderSevice.listOrder(user_id,status,page,itemPerPage);
        const pages = Math.ceil(listOrder.count / itemPerPage);
        let next =page < pages - 1?page+2:"";
		let prev =page>0?page:"";
        const message = req.query.message;
        listOrder.rows.forEach(element => {
            if(element.order_status == "Đang chờ xử lý")
            element.can_cancel = 1;
            if(element.order_status == "Đã hủy")
                element.is_cancel = 1;
        });
        res.render('../components/orders/orderViews/listOrder', { listOrder:listOrder.rows, message,cancel,status:status.toLowerCase(),pages,page,next,prev});
    }
    catch (error) {
        next(error);
    }
}
exports.detail = async (req, res, next) => {
    try {
        const order_id = req.params.order_id;
        let detailOrder = await orderSevice.detailOrder(order_id);
        let order = await orderSevice.order(order_id);
        const voucher = await voucherService.getVoucher(order.voucher);
        if (order.order_status == "Đã giao") {
            detailOrder.forEach(element => {
                element.is_complete = 1;
            });
        }
        res.render('../components/orders/orderViews/detailOrder', { detailOrder, order, voucher});
    }
    catch (error) {
        next(error);
    }
}

exports.review = async (req, res, next) => {
    try {
        const product_id = req.body.product_id;
        const order_id = req.body.order_id;
        const content = req.body.review;
        const rating = req.body.star;
        console.log({ product_id: product_id, content: content, rating: rating, user_id: req.user.user_id });
        const review = await reviewService.addReview({ product_id: product_id, content: content, rating: rating, user_id: req.user.user_id });
        const review_id = review.review_id;
        await orderSevice.reviewDetailOrder(order_id, product_id, review_id);
        res.redirect('/orders/' + order_id);
    }
    catch (error) {
        next(error);
    }
}
exports.delete = async (req,res,next) =>
{
    try{
        const order_id = req.body.order_id;
        await orderSevice.delete(order_id);
        res.redirect('/orders?status=Đã+hủy&cancel=success');
    }
    catch (error) {
        next(error);
    }
}