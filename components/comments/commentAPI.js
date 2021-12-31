const commentService = require('./commentService');

exports.addComment = async (req, res, next) => {
    try {
        const { content, name, email } = req.body;
        const product_id = req.params.id;
        await commentService.addComment({ content, name, email, product_id });
        res.json(true);
    }
    catch (error) {
        res.json(false);
    }
}

exports.getComments = async (req, res, next) => {
    try {
        const product_id = req.params.id;
        const page = req.query.page || 1;
        const comments = await commentService.getComments(product_id, page, 5);
        res.json({
            comments: comments.rows,
            pagination: {
                page: page,
                limit: 5,
                totalRows: comments.count,
                pages: Math.ceil(comments.count / 5)
            }
        });
    }
    catch (error) {
        res.json(false);
    }
}