const {models} = require('../../models');
const {Op} = require('sequelize');

exports.listOrder= (id,status,page,itemPerPage) => {
    return models.orders.findAndCountAll(
        {
            where:{
                user_id:id,
                order_status:status
            },
            order:[
                ['create_date', 'DESC'],
            ]
            ,
            raw:true, 
            offset: page * itemPerPage,
            limit: itemPerPage,
        }
    )
}
exports.detailOrder= (id) => {
    return models.detailorders.findAll({
        include:[{
            model:models.products,
            as:'product',
            include:[
                {
                model:models.images,
                as:'images',
                where:{image_stt:1}
                },
                {
                model:models.categories,
                as:'category',
                }
            ]
        }],
        where:{
            order_id:id
        },
        raw:true
    })
}
exports.order = (id) => {
    return models.orders.findOne({
        where: {
            order_id:id
        },
        raw:true
    })
}

exports.create = (order) => {
    return models.orders.create({
        user_id:order.user_id,
        receive_phone:order.receive_phone,
        receive_address:order.receive_address,
        voucher:order.voucher,
        payment_status:order.payment_status
    });
}

exports.createDetail = async (detail) => {
    return await models.detailorders.create({
        order_id:detail.order_id,
        product_id:detail.product_id,
        quantity:detail.quantity
    });
}

exports.reviewDetailOrder = (order_id,product_id,review_id) =>
{
    return models.detailorders.update({
        review_id : review_id,
        
    },
    {
        where:{
            order_id:order_id,
            product_id:product_id
        }
    })
}
exports.delete = (order_id) =>
{
    return models.orders.update({order_status:"Đã hủy"},{where:{order_id:order_id}})
}