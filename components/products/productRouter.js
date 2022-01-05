const express = require('express');
const router = express.Router();
const productAPI = require('./productAPI');

const productController = require('./productController')
const commentAPI = require('../comments/commentAPI')

router.get('/', productController.getAll);

router.get('/:id', productController.getOne);

router.post('/:id/comment/add', commentAPI.addComment);
router.get('/:id/comments', commentAPI.getComments);
router.post('/suggest',productAPI.searchSuggest);
module.exports = router;

