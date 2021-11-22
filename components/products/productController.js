const productService = require('./productService');
const categoryService = require('../categories/categoryService');
const brandService = require('../brands/brandService');
exports.getAll = async (req, res, next) => {
    try {
        const products = await productService.getAll();
        const categories = await categoryService.getAll();
        const brands = await brandService.getAll();
        // console.log(products);
        res.render('../components/products/productViews/productList', {products, categories, brands});
    } 
    catch(err) {
        next(err);
    }
}

exports.getOne = async (req, res, next) => {
    try {
        const id = req.params.id;
        console.log(id);
        const product = await productService.getOne(id);
        res.render('../components/products/productViews/productDetail', {product});
        // res.render('../components/products/productViews/productDetail');
    } 
    catch(err) {
        next(err);
    }
}