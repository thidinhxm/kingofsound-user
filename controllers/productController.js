const controller = {}
const {models} = require('../models');


controller.getAll = async (req, res, next) => {
    try {
        const products = await models.products.findAll({raw : true});
        res.render('products/productsList', {products});
    }
    catch(err) {
        next(err);
    }
}

module.exports = controller;