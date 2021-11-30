const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
	return sequelize.define('user_roles', {
		role_id: {
			type: DataTypes.CHAR(20),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'roles',
				key: 'role_id'
			}
		},
		user_id: {
			type: DataTypes.CHAR(20),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'users',
				key: 'user_id'
			}
		}
	}, {
		sequelize,
		tableName: 'user_roles',
		timestamps: false,
		indexes: [
			{
				name: "PRIMARY",
				unique: true,
				using: "BTREE",
				fields: [
					{ name: "role_id" },
					{ name: "user_id" },
				]
			},
			{
				name: "fk_user",
				using: "BTREE",
				fields: [
					{ name: "user_id" },
				]
			},
		]
	});
};
