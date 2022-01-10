const {models} = require('../../models');

exports.getReviewsProduct = (product_id) => {
    return models.reviews.findAll({
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

exports.getAverageRating = (reviews) => {
    if (reviews.length === 0) {
        return 5;
    }

    return reviews.reduce((total, review) => {
        return total + review.rating;
    }, 0) / reviews.length;
}

exports.addReview = (review) =>
{
    return models.reviews.create(
        {
            product_id:review.product_id,
            content:review.content,
            rating:review.rating,
            user_id:review.user_id
        }
    );
}
exports.getReview = (review_id) =>
{
    return models.reviews.findOne(
        {
            where : {
                review_id : review_id
            },
            raw:true
        }
    )
    
}