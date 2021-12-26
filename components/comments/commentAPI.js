const commentService = require('./commentService');

exports.addComment = async (req, res, next) => {
    try {
        const { content, name, email } = req.body;
        const product_id = req.params.id;
        const comment = await commentService.addComment({ content, name, email, product_id });
        res.json(true);
    }
    catch (error) {
        res.json(false);
    }
}

exports.getComments = async (req, res, next) => {
    try {
        const product_id = req.params.id;
        const comments = await commentService.getComments(product_id);
        res.json(comments);
    }
    catch (error) {
        res.json(false);
    }
}