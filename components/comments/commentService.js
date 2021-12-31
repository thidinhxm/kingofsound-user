const {models} = require('../../models');
const {formatDateTime} = require('../reviews/reviewHelper');
exports.getComments =  async (id, pageInput, limitInput) => {
    const page = pageInput || 1;
    const limit = limitInput || 5;
    const commentsRowAndCount = await models.comments.findAndCountAll({
        offset: (page - 1) * limit,
        limit: limit,
        where : {
            product_id : id,
        },
        order: [
            ['created_at', 'DESC']
        ],
        raw : true
    });

    if (commentsRowAndCount.rows) {
        commentsRowAndCount.rows.forEach((comment) => {
            comment.created_at_string = formatDateTime(comment.created_at);
        });
    }

    return commentsRowAndCount;
}

exports.addComment = (comment) => {
    return models.comments.create(comment);
}

