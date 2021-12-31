const orderSevice = require('./orderService');
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
        res.render('../components/orders/orderViews/detailOrder',{detailOrder,order});
    }
    catch (error) {
        next(error);
    }
}