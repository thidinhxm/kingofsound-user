const productService = require('../products/productService');

exports.index = async (req, res, next) => {
    try {
        const newProducts = await productService.getNewProducts();
        const hotProducts = await productService.getHotProducts();
        req.session.oldUrl = req.originalUrl;

        res.render('../components/home/homeViews/index', { newProducts, hotProducts });
    }
    catch (err) {
        next(err);
    }
}

exports.about = (req, res, next) => {
    res.render('../components/home/homeViews/about');
}

