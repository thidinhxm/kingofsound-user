const {models} = require('../../models');
const {Op} = require('sequelize');

exports.getUserByEmail = async (email) => {
	try {
		const user = await models.users.findOne({
			where: {email: email},
			raw: true
		});
		
		if (user) {
			const userRole = await models.userroles.findOne({
				where: {
					user_id: user.user_id,
					role_id: {
						[Op.ne] : [1, 2]
					}
				},
				raw: true
			});
			if (userRole) {
				return user;
			}
			return 'admin';
		}
		return null;
	}
	catch (err) {
		throw err;
	}
}

exports.getUserById = (id) => {
	return models.users.findOne({
		where: {user_id: id},
		raw: true
	});
}

exports.createUser = (user) => {
	return models.users.create(user);
}

exports.createUserRole = (role) => {
	return models.userroles.create(role);
}

exports.updateUser = (user) => {
	return models.users.update(user, {
		where: {
			user_id: user.user_id
		}
	});
}

exports.updatePassword = (id, passwordHash) => {
	return models.users.update({
		password: passwordHash
	}, {
		where: {
			user_id: id
		}
	});
}

exports.getUserByToken = (token) => {
	return models.users.findOne({
		where: {token: token},
		raw: true
	});
}

exports.getUserByEmailAndToken = (email, token) => {
	return models.users.findOne({
		where: {email: email, token: token},
		raw: true
	});
}