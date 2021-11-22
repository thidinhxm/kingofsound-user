const express = require('express');
const router = express.Router();
const productController = require('./productController')

router.get('/', productController.getAll);

router.get('/:id', productController.getOne);

module.exports = router;

