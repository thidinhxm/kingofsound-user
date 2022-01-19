const {models} = require('../../models');
const sequelize = require('sequelize');


exports.getAll = () => {
    return models.brands.findAll({
        attributes : [ 'brand_id', 'brand_name', [sequelize.fn('COUNT', sequelize.col('*')), 'length']],
        where : {
            is_active : 1
        },
        group: ['brand_id', 'brand_name'],
        include: [{
                model: models.products,
                as: 'products',
                attributes: [],
            }],
        raw: true,
    });
}
