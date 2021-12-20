const {models} = require('../../models');


exports.getCart = (id) =>
{
    return models.detailcarts.findAll({
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
            user_id:id
        },
        raw:true
    })
}