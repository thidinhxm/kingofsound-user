const productService = require('../products/productService');
const reviewService = require('../reviews/reviewService');
exports.index = async (req, res, next) => {
    try {
        const newProducts = await productService.getNewProducts();
        const hotProducts = await productService.getHotProducts();
        newProducts.forEach(async (product) => {
            product.reviews = await reviewService.getReviewsProduct(product.product_id);
            product.average_rating = reviewService.getAverageRating(product.reviews);
        });

        hotProducts.forEach(async (product) => {
            product.reviews = await reviewService.getReviewsProduct(product.product_id);
            product.average_rating = reviewService.getAverageRating(product.reviews);
        });

        res.render('../components/home/homeViews/index', {newProducts, hotProducts});
    }
    catch (err) {
        next(err);
    }
}



exports.checkout = (req, res) => {
    res.render('../components/home/homeViews/checkout');
}



