const productService = require('../products/productService');

exports.index = async (req, res, next) => {
    try {
        const newProducts = await productService.getNewProducts();
        const hotProducts = await productService.getHotProducts();
        req.session.oldUrl = req.originalUrl;

        console.log(newProducts);
        res.render('../components/home/homeViews/index', { newProducts, hotProducts });
    }
    catch (err) {
        next(err);
    }
}


