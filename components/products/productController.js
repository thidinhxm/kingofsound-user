const productService = require('./productService');
const categoryService = require('../categories/categoryService');
const brandService = require('../brands/brandService');
const reviewService = require('../reviews/reviewService');
const commentService = require('../comments/commentService');
exports.getAll = async (req, res, next) => {
    try {
        req.query.page = Math.max(1, parseInt(req.query.page) || 1);
        req.query.limit = Math.min(18, parseInt(req.query.limit) || 9);
        req.query.min = Math.max(100, parseInt(req.query.min) || 100);
        req.query.max = Math.min(10000, parseInt(req.query.max) || 10000);
        req.query.categories = req.query.categories || '';
        req.query.subCategories = req.query.subCategories || '';
        req.query.brands = req.query.brands || '';
        req.query.sort = req.query.sort || 'model_year';
        
        const products = await productService.getAll(req.query);

        const pagination = {
            page: req.query.page,
            limit: req.query.limit,
            totalRows: products.count,
            pages: Math.ceil(products.count / req.query.limit)
        }

        const categories = await categoryService.getAll();
        const brands = await brandService.getAll();
        const bestSalesProducts = await productService.getBestSalesProducts(5);

        req.session.oldUrl = req.originalUrl;
        const speakerActive = (req.query.search === 'loa') ? 'active' : '';
        const headphoneActive = (req.query.search === 'tai nghe') ? 'active' : '';
        const productActive = !(speakerActive || headphoneActive) ? 'active' : '';
        res.render('../components/products/productViews/productList', {
            products: products.rows,
            categories,
            brands,
            pagination,
            bestSalesProducts,
            productActive: productActive,
            speakerActive: speakerActive,
            headphoneActive: headphoneActive,
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
        
        await productService.updateViewProduct(id);

        commentsRowAndCount = await commentService.getComments(id);
        product.comments = commentsRowAndCount.rows;
        const paginationComment = {
            page: 1,
            limit: 5,
            totalRows: commentsRowAndCount.count,
            pages: Math.ceil(commentsRowAndCount.count / 5) || 1
        }

        const reviewsRowAndCount = await reviewService.getReviews(id);

        product.reviews = reviewsRowAndCount.rows;
        
        const paginationReview = {
            page: 1,
            limit: 5,
            totalRows: reviewsRowAndCount.count,
            pages: Math.ceil(reviewsRowAndCount.count / 5) || 1
        }

        const similarProducts = await productService.getSimilarProducts(product.category_id, product.brand_id, id);
        
        req.session.oldUrl = req.originalUrl;
        res.render('../components/products/productViews/productDetail', {
            product, 
            similarProducts, 
            paginationComment, 
            paginationReview,
            productActive: 'active'
        });
    } 
    catch(err) {
        next(err);
    }
}