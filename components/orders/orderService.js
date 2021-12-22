const {models} = require('../../models');

exports.listOrder= (id) =>
{
    return models.orders.findAll(
        {
            where:{
                user_id:id
            },
            raw:true
        }
    )
}
exports.detailOrder= (id) =>
{
    return models.detailorders.findAll(
        {
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
        }
    )
}
exports.order = (id) =>
{
    return models.orders.findOne(
        {
            where:
            {
                order_id:id
            }
            ,raw:true
        }
    )
}