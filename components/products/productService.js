const {models} = require('../../models');
const Op = require('sequelize').Op;


exports.getAll = (query) => {
    const option = {
        offset: (query.page - 1) * query.limit,
        limit: query.limit,
        where: {
            price: {
                [Op.between]: [query.min * 1000, query.max * 1000]
            }
        },
        include : [{
            model : models.images,
            as : 'images',
            where : {
                image_stt: 1
            },
        }],
        raw : true
    }
    if(query.categories) {
        const categories = query.categories.split(',');
        option.where.category_id = {
            [Op.or]: categories
        }
    }
    if(query.brands) {
        const brands = query.brands.split(',');
        console.log(brands);
        option.where.brand_id = {
            [Op.or]: brands
        }
    }

    return models.products.findAndCountAll(option);
}

exports.getImagesProduct = (id) => {
    return models.images.findAll({
        attributes : ['image_link'],
        where : {
            product_id : id
        },
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
