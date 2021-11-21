const productService = require('./productService');

exports.getAll = async (req, res, next) => {
    try {
        const products = await productService.getAll();
        res.render('../components/products/productViews/productList', {products});
    } 
    catch(err) {
        next(err);
    }
}

exports.getOne = async (req, res, next) => {
    try {
        const id = req.params.id;
        const product = await productService.getOne(id);
        res.render('../components/products/productViews/productDetail', {product});
    } 
    catch(err) {
        next(err);
    }
}