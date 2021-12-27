const {models} = require('../../models');
const bcrypt = require('bcrypt');

exports.getUserByEmail = (email) => {
	return models.users.findOne({
		where: {
			email: email,
			is_blocked: false
		},
		include: [{
			model: models.userroles,
			as: 'userroles',
			attributes: [],
			where: {
				role_id: 3
			},
		}],
		raw: true
	});
}

exports.getAccountByEmail = (email) => {
	return models.users.findOne({
		where: {
			email: email,
		},
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
exports.updateUser = (user) =>{
	return models.users.update(user, {
		where: {user_id: user.user_id},
		raw: true
	});
}

exports.getUserByToken = (token) => {
	return models.users.findOne({
		where: {token: token},
		raw: true
	});
}