const {models} = require('../../models');

exports.getAll = () => {
    return models.products.findAll({
        include : [{
            model : models.images,
            as : 'images',
            where : {
                image_stt: 1
            },
        }],
        raw : true
    });
}

exports.getOne = (id) => {
    return models.products.findOne({
        where : {
            product_id : id
        },
        raw : true
    });
}