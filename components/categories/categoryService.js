const {models} = require('../../models');
const sequelize = require('sequelize');
const Op = sequelize.Op;

exports.getAll = () => {
    return models.categories.findAll({
        attributes : [ 'category_id', 'category_name', [sequelize.fn('COUNT', sequelize.col('*')), 'length']],
        group: ['category_id', 'category_name'],
        where : {
            parent_category: {
                [Op.ne]: null
            }
        },
        include: [{
                model: models.products,
                as: 'products',
                attributes: [],
            }],
        raw: true,
    });
}

exports.getCategory = async (id) => {
    try {
        const category = await models.categories.findOne({
            attributes : [ 'category_id', 'category_name'],
            where : {
                category_id : id
            },
            include : [{
                model : models.categories,
                as : 'parent_category_category',
                attributes : ['category_name'],
    
                }],
                raw : true
        });
    
        category.parent_category_name = category['parent_category_category.category_name']
        delete category['parent_category_category.category_name']
        return category;
    }
    catch (error) {
        return error;
    }
}
