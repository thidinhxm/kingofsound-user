const {models} = require('../../models');

exports.getReviewsProduct = (product_id) => {
    return models.reviews.findAll({
        attributes : ['review', 'rating'],
        where : {
            product_id : product_id
        },
        include : [{
            model : models.users,
            as : 'user',
            attributes : ['user_name']
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

exports.createProductRating = async (product) => {
    product.reviews = await this.getReviewsProduct(product.productid);
    product.average_rating = this.getAverageRating(product.reviews);
}