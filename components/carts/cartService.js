const {models} = require('../../models');

exports.getCart = (user_id) => {
    return models.carts.findOne({
        where: {
            user_id: user_id
        },
        raw: true
    })
}

exports.getDetailCart = (cart_id) => {
    return models.detailcarts.findAll({
        attributes: ['product_id', 'quantity', 'subtotal'],
        include: [{
            model: models.products,
            as: 'product',
            attributes: ['price', 'product_name', 'model_year'],
            include:[{
                model:models.images,
                as:'images',
                where: {image_stt:1},
                attributes:['image_link']
                }, {
                model:models.categories,
                as:'category',
                attributes: ['category_name']
            }]
        }],
        where: {
            cart_id: cart_id
        },
        raw: true
    })
}

exports.createCart = (user_id) => {
    return models.carts.create({
        user_id: user_id
    })
}

exports.addToCart = (cart_id, product_id, quantity = 1) => {
    return models.detailcarts.create({
        cart_id: cart_id,
        product_id: product_id,
        quantity: quantity
    })
}
