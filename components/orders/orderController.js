const orderSevice = require('./orderService');
exports.list = async (req, res) => {
    const user = req.user;
    const user_id = user.user_id;
    const listOrder =  await orderSevice.listOrder(user_id); 
    res.render('../components/orders/orderViews/listOrder',{listOrder});
}
exports.detail = async (req, res) => {
    const order_id = req.params.order_id;
    const detailOrder = await orderSevice.detailOrder(order_id);
    const order =  await orderSevice.order(order_id);
    res.render('../components/orders/orderViews/detailOrder',{detailOrder,order});
}