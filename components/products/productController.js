const controller = {}
// const {models} = require('../../models');


controller.getAll = async (req, res, next) => {
    // try {
    //     const products = await models.products.findAll({raw : true});
    //     res.render('products/productsList', {products});
    // }
    // catch(err) {
    //     next(err);
    // }

    res.render('../components/products/productViews/productList');
}

controller.getOne = async (req, res, next) => {
    // try {
    //     const product = await models.products.findOne({
    //         where : {
    //             id : req.params.id
    //         },
    //         raw : true
    //     });
        res.render('../components/products/productViews/productDetail');
    // }
    // catch(err) {
    //     next(err);
    // }
}
module.exports = controller;