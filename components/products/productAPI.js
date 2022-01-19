const productSevice = require('./productService');

exports.searchSuggest = async (req, res, next) => {

    try {
        const { search_name } = req.body;
        const products = await productSevice.getProductSuggest(search_name);
        if (products)
            res.json({
                products: products,
                success: true
            });
        else
            res.json({ success: false });
    }
    catch (err) {
        next(err);
    }
}