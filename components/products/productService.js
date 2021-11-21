const models = require('../../models');

exports.getAll = () => {
    return models.products.findAll({raw : true});
}

exports.getOne = (id) => {
    return models.products.findOne({
        where : {
            id : id
        },
        raw : true
    });
}