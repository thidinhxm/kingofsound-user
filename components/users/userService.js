const {models} = require('../../models');
const bcrypt = require('bcrypt');

exports.findByEmail = (email) => {
    return models.users.findOne({
        where: {email: email},
        raw: true
    });
}

exports.createUser = (user) => {
    user.password = bcrypt.hashSync(user.password, 10);
    return models.users.create(user);
}