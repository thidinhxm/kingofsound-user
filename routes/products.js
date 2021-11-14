var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.render('products/productsList');
});

router.get('/:productId', function(req, res, next) {
    res.render('products/productDetail');
  });

module.exports = router;

