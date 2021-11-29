const productService = require('./productService');
const categoryService = require('../categories/categoryService');
const brandService = require('../brands/brandService');
exports.getAll = async (req, res, next) => {
    try {
        req.query.page = Math.max(1, parseInt(req.query.page) || 1);
        req.query.limit = Math.max(9, parseInt(req.query.limit) || 9);
        req.query.min = Math.max(100, parseInt(req.query.min) || 100);
        req.query.max = Math.min(10000, parseInt(req.query.max) || 10000);
        req.query.categories = req.query.categories || '';
        req.query.brands = req.query.brands || '';

        const products = await productService.getAll(req.query);
        const pagination = {
            page: req.query.page,
            limit: req.query.limit,
            totalRows: products.count,
            pages: Math.ceil(products.count / req.query.limit)
        }
        const categories = await categoryService.getAll();
        const brands = await brandService.getAll();
        console.log(brands);
        res.render('../components/products/productViews/productList', {
            products: products.rows,
            categories, 
            brands,
            pagination,
        });
    } 
    catch(err) {
        next(err);
    }
}

exports.getOne = async (req, res, next) => {
    try {
        const id = req.params.id;
        const product = await productService.getOne(id);
        product.images = await productService.getImagesProduct(id);
        product.categories = await categoryService.getCategory(product.category_id);
        product.categories.parent_category_name = product.categories['parent_category_category.category_name']
        delete product.categories['parent_category_category.category_name']
        
        res.render('../components/products/productViews/productDetail', {product});
    } 
    catch(err) {
        next(err);
    }
}