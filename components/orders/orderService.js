const {models} = require('../../models');
const {updateNumberOfSales, updateQuantity} = require('../products/productService');
const {getVoucher} = require('../vouchers/voucherService');
const {literal} = require('sequelize');
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
        user_id : order.user_id,
        receive_phone : order.receive_phone,
        receive_address : order.receive_address,
        voucher : order.voucher,
        payment_status : order.payment_status
    });
}

exports.updateTotalOrder = (order_id, subtotal) => {
    return models.orders.update({
        total_price: literal(`total_price + ${subtotal}`)
    }, {
        where: {
            order_id: order_id
        }
    });
}

exports.createDetail = async (detail) => {
    try {
        await models.detailorders.create({
            order_id : detail.order_id,
            product_id : detail.product_id,
            quantity : detail.quantity,
            subtotal : detail.subtotal
        });

        if (detail.voucher) {
            const voucher = await getVoucher(detail.voucher);
            await Promise.all([
                this.updateTotalOrder(detail.order_id, detail.subtotal*(1 - voucher.discount / 100)), 
                updateNumberOfSales(detail.product_id, detail.quantity),
                
            ]);
        }
        else {
            await Promise.all([
                this.updateTotalOrder(detail.order_id, detail.subtotal), 
                updateNumberOfSales(detail.product_id, detail.quantity),
                updateQuantity(detail.product_id, -detail.quantity)
            ]);
        }
            
    }
    catch(error) {
        throw error;
    }
}

exports.updateReviewInDetail = (order_id, product_id, review_id) => {
    return models.detailorders.update({
        review_id : review_id,
    }, {
        where:{
            order_id:order_id,
            product_id:product_id
        }
    })
}

exports.cancelOrder = async (order_id) => {
    try {
        await models.orders.update({
            order_status : "Đã hủy"
        },{
            where:{
                order_id: order_id
            }
        })
    
        const detail = await models.detailorders.findAll({
            where:{
                order_id:order_id
            },
            raw : true
        })
        
        await Promise.all(detail.map(async (item) => {
            await updateQuantity(item.product_id, item.quantity);
        }))

        await Promise.all(detail.map(async (item) => {
            await updateNumberOfSales(item.product_id, -item.quantity);
        }))
    }
    catch(error) {
        throw error;
    }
}