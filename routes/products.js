const express = require('express');
const router = express.Router();
const Product = require('../controllers/productController')

router.get('/', Product.getAll);

router.get('/:productId', function(req, res, next) {
    res.render('products/productDetail');
  });

module.exports = router;

