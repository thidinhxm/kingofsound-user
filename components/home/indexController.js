const productService = require('../products/productService');

exports.index = async (req, res, next) => {
    try {
        const newProducts = await productService.getNewProducts();
        const hotProducts = await productService.getHotProducts();
        res.render('../components/home/homeViews/index', {newProducts, hotProducts});
    }
    catch (err) {
        next(err);
    }
}

exports.login = (req, res) => {
    res.render('../components/home/homeViews/login');
}

exports.register = (req, res) => {
    res.render('../components/home/homeViews/register');
}

exports.checkout = (req, res) => {
    res.render('../components/home/homeViews/checkout');
}



