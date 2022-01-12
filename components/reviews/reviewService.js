const {models} = require('../../models');

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

exports.addReview = (review) => {
    return models.reviews.create(review);
}

exports.getReview = (review_id) => {
    return models.reviews.findOne({
        where : {
            review_id : review_id
        },
        raw:true
    });
    
}