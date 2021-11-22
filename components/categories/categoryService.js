const {models} = require('../../models');

exports.getAll = () => {
    return models.categories.findAll({
        raw: true,
    });
}
