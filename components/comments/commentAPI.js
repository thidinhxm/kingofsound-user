const commentService = require('./commentService');

exports.addComment = async (req, res, next) => {
    try {
        const { product_id, descriptions, name, email } = req.body;
        const comment = await commentService.addCommentProduct(product_id, descriptions, name, email);
        res.json(comment);
    }
    catch (error) {
        res.json(false);
    }
}