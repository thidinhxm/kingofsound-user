const {models} = require('../../models');
const {updateRatingProduct} = require('../products/productService');
const {updateReviewInDetail} = require('../orders/orderService');
exports.getReviews = (product_id, pageInput, limitInput) => {
    const page = pageInput || 1;
    const limit = limitInput || 5;
    return  models.reviews.findAndCountAll({
        offset: (page - 1) * limit,
        limit: limit,
        subQuery: false,
        attributes : ['content', 'rating', 'created_at'],
        include : [{
            model : models.detailorders,
            as : 'detailorders',
            attributes : [],
            where : {
                product_id : product_id
            },
            include : [{
                model : models.orders,
                as : 'order',
                attributes : [],
                include : [{
                    model : models.users,
                    as : 'user',
                    attributes : ['lastname']
                }]
            }]
        }],
        where : {
            '$detailorders.product_id$' : product_id
        },
        order:[
            ['created_at', 'DESC'],
        ],
        raw : true
    });
}

exports.addReview = async (review) => {
    try {
        const newReview = (await models.reviews.create(review)).get({plain:true});

        await Promise.all([
            updateReviewInDetail(review.order_id, review.product_id, newReview.review_id),
            updateRatingProduct(review.product_id, review.rating)
        ]);
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
