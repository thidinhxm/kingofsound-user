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