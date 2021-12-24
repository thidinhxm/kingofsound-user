const {models} = require('../../models');

exports.getCommentsProduct =  (id) => {
    return models.comments.findAll({
        where : {
            product_id : id,
        },
        order: [
            ['created_at', 'DESC']
        ],
        raw : true
    });
}

exports.addCommentProduct =  (comment) => {
    return models.comments.create(comment);
}

