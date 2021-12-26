const {models} = require('../../models');
const {formatDateTime} = require('../reviews/reviewHelper');
exports.getComments =  async (id) => {
    const comments = await models.comments.findAll({
        where : {
            product_id : id,
        },
        order: [
            ['created_at', 'DESC']
        ],
        raw : true
    });

    if (comments) {
        comments.forEach(async (comment) => {
            comment.created_at_string = formatDateTime(comment.created_at);
        });
    }

    return comments
}

exports.addComment =  (comment) => {
    return models.comments.create(comment);
}

