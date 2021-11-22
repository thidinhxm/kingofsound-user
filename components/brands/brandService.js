const {models} = require('../../models');

exports.getAll = () => {
    return models.brands.findAll({
        raw: true,
    });
}
