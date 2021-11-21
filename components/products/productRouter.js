const express = require('express');
const router = express.Router();
const productController = require('./productController')

router.get('/', productController.getAll);

router.get('/:productId', productController.getOne);

module.exports = router;

