const productService = require('../products/productService');

exports.index = async (req, res, next) => {
    try {
        const newProducts = await productService.getNewProducts(12);
        const hotProducts = await productService.getHotProducts(12);
        const highRatingProducts = await productService.getHighRatingProducts(12);
        const bestSalesProducts = await productService.getBestSalesProducts(12);
        req.session.oldUrl = req.originalUrl;

        res.render('../components/home/homeViews/index', { newProducts, hotProducts, highRatingProducts, bestSalesProducts });
    }
    catch (err) {
        next(err);
    }
}

exports.about = (req, res, next) => {
    res.render('../components/home/homeViews/about');
}

