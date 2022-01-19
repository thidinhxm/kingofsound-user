const {models} = require('../../models');
const {fn, col} = require('sequelize');

exports.getAll = async () => {
    const parentCategories = await models.categories.findAll({
        attributes : [ 'category_id', 'category_name'],
        group: ['category_id', 'category_name'],
        where : {
            parent_category: null,
            is_active : 1
        },
        raw: true,
    });
    
    const categories = Promise.all(parentCategories.map(async (parentCategory) => {
        const subCategories = await models.categories.findAll({
            attributes : [ 'category_id', 'category_name', [fn('COUNT', col('*')), 'length']],
            group: ['category_id', 'category_name'],
            where : {
                parent_category: parentCategory.category_id,
                is_active : 1
            },
            include: [{
                model: models.products,
                as: 'products',
                attributes: [],
            }],
            raw: true,
        });
        const totalProducts = subCategories.reduce((acc, cur) => {
            return acc + cur.length;
        }, 0);
        return {...parentCategory, subCategories, totalProducts};
    }));

    return categories;
}


exports.getCategory = async (id) => {
    try {
        const category = await models.categories.findOne({
            attributes : [ 'category_id', 'category_name'],
            where : {
                category_id : id,
                is_active : 1
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

