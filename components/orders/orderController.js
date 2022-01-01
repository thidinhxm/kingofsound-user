const orderSevice = require('./orderService');
const voucherService = require('../vouchers/voucherService')
exports.list = async (req, res, next) => {
    try {
        const user = req.user;
        const user_id = user.user_id;
        const listOrder =  await orderSevice.listOrder(user_id); 
        res.render('../components/orders/orderViews/listOrder',{listOrder});
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
        res.render('../components/orders/orderViews/detailOrder',{detailOrder,order,voucher});
    }
    catch (error) {
        next(error);
    }
}