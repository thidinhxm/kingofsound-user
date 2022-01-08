const {models} = require('../../models');
const {Op, literal} = require('sequelize');
const reviewService = require('../reviews/reviewService');
exports.getAll = async (query) => {
    try {
        const option = {
            offset: (query.page - 1) * query.limit,
            limit: query.limit,
            where: {
                price: {
                    [Op.between]: [query.min * 1000, query.max * 1000]
                },
                is_active: 1
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
        if(query.subCategories) {
            const categories = query.subCategories.split(',');
            option.where.category_id = {
                [Op.or]: categories
            }
        }
        if(query.brands) {
            const brands = query.brands.split(',');
            option.where.brand_id = {
                [Op.or]: brands
            }
        }

        if (query.sort) {
            switch (query.sort) {
                case 'price_asc':
                    option.order = [
                        ['price', 'ASC']
                    ];
                    break;
                case 'price_desc':
                    option.order = [
                        ['price', 'DESC']
                    ];
                    break;
                case 'model_year':
                    option.order = [
                        ['model_year', 'ASC']
                    ];
                    break;
                case 'name_asc':
                    option.order = [
                        ['product_name', 'ASC']
                    ];
                    break;
                default:
                    option.order = [
                        ['model_year', 'DESC']
                    ];
                    break;
            }
        }

        if (query.search) {
            option.where.product_name = {
                [Op.like]: `%${query.search}%`
            }
        }
    
        const products = await models.products.findAndCountAll(option);
        if (products) {
            products.rows.forEach(async (product) => {
                    product.reviews = await reviewService.getReviewsProduct(product.product_id);
                    product.average_rating = reviewService.getAverageRating(product.reviews);
            });
        }
                
        return products;
    }
    catch(error) {
        throw error;
    }
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
            product_id : id,
            is_active : 1
        },
        raw : true
    });
}

exports.getNewProducts = async (limit = 10) => {
    try {
        const newProducts = await  models.products.findAll({
            limit : limit,
            order : [
                ['model_year', 'DESC']
            ],
            where : {
                is_active : 1
            },
            include : [{
                model : models.images,
                as : 'images',
                where : {
                    image_stt: 1
                },
            }],
            raw : true
        });

        if (newProducts) {
            newProducts.forEach(async (product) => {
                product.reviews = await reviewService.getReviewsProduct(product.product_id);
                product.average_rating = reviewService.getAverageRating(product.reviews).toFixed(1);
            });
        }
        return newProducts;
    }
    catch(error) {
        throw error;
    }
}

exports.getHotProducts = async (limit = 10) => {
    try {
        hotProducts = await models.products.findAll({
            limit : limit,
            order : [
                ['model_year']
            ],
            where : {
                is_active : 1
            },
            include : [{
                model : models.images,
                as : 'images',
                where : {
                    image_stt: 1
                },
            }],
            raw : true
        });

        if (hotProducts) {
            hotProducts.forEach(async (product) => {
                product.reviews = await reviewService.getReviewsProduct(product.product_id);
                product.average_rating = reviewService.getAverageRating(product.reviews).toFixed(1);
            });
        }

        return hotProducts;
    }
    catch(error) {
        throw error;
    }
}

exports.getSimilarProducts = async (category_id, brand_id, product_id, limit = 10) => {
    try {
        const products = await models.products.findAll({
            limit : limit,
            where : {
                [Op.or] : [
                    { category_id : category_id },
                    { brand_id : brand_id },
                ],
                product_id : {
                    [Op.ne] : product_id,
                },
                is_active : 1
            },
            order : [
                ['model_year', 'DESC']
            ],
            include : [{
                model : models.images,
                as : 'images',
                where : {
                    image_stt: 1
                },
            }],
            raw : true
        });
        
        if (products) {
            products.forEach(async (product) => {
                product.reviews = await reviewService.getReviewsProduct(product.product_id);
                product.average_rating = reviewService.getAverageRating(product.reviews).toFixed(1);
            });
        }
        return products;
    }
    catch(error) {
        throw error;
    }
}

exports.updateViewProduct = (id) => {
    return models.products.update({
        number_of_views : literal('number_of_views + 1')
    }, {
        where : {
            product_id : id
        }
    });
}

exports.getProductSuggest = (search_name) =>
{
    return models.products.findAll({
        attributes:['product_name','product_id'],
        where:{
            product_name:
            {
                [Op.substring]:search_name
            }
        },
        raw:true,
        limit:10
    })
}