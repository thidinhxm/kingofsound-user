const {models} = require('../../models');
const bcrypt = require('bcrypt');

exports.getUserByEmail = (email) => {
    return models.users.findOne({
        where: {email: email},
        raw: true
    });
}

exports.getUserById = (id) => {
    return models.users.findOne({
        where: {user_id: id},
        raw: true
    });
}
exports.createUser = (user) => {
    user.password = bcrypt.hashSync(user.password, 10);
    return models.users.create(user);
}

exports.createUserRole = (role) => {
    return models.userroles.create(role);
}
