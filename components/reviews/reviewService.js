const {models} = require('../../models');
const {fn, col} = require('sequelize');
const {updateAverageRating} = require('../products/productService');
exports.getReviews = (product_id, pageInput, limitInput) => {
    const page = pageInput || 1;
    const limit = limitInput || 5;
    return  models.reviews.findAndCountAll({
        offset: (page - 1) * limit,
        limit: limit,
        attributes : ['content', 'rating', 'created_at'],
        where : {
            product_id : product_id
        },
        include : [{
            model : models.users,
            as : 'user',
            attributes : ['lastname']
        }],
        order:[
            ['created_at', 'DESC'],
        ],
        raw : true
    });
}

exports.addReview = async (review) => {
    try {
        await models.reviews.create(review);
        const averageRating = await exports.getAverageRating(review.product_id);
        await updateAverageRating(review.product_id, averageRating);
    }
    catch(error) {
        throw error;
    }
}

exports.getReview = (review_id) => {
    return models.reviews.findOne({
        where : {
            review_id : review_id
        },
        raw:true
    });
}

exports.getAverageRating = async (product_id) => {
    try {
        const averageRating = await models.reviews.findAll({
            attributes : [
                [fn('AVG', col('rating')), 'average_rating'],
            ],
            where : {
                product_id : product_id
            },
            raw : true
        });
        return averageRating[0].average_rating;
    }
    catch(error) {
        throw error;
    }
}