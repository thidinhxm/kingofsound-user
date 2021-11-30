const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
	return sequelize.define('users', {
		user_id: {
			type: DataTypes.CHAR(20),
			allowNull: false,
			primaryKey: true
		},
		user_password: {
			type: DataTypes.CHAR(16),
			allowNull: false
		},
		user_name: {
			type: DataTypes.STRING(50),
			allowNull: false
		},
		address: {
			type: DataTypes.STRING(50),
			allowNull: false
		},
		phone: {
			type: DataTypes.CHAR(11),
			allowNull: false
		},
		email: {
			type: DataTypes.STRING(50),
			allowNull: false
		},
		isBlock: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: 0
		}
	}, {
		sequelize,
		tableName: 'users',
		timestamps: false,
		indexes: [
			{
				name: "PRIMARY",
				unique: true,
				using: "BTREE",
				fields: [
					{ name: "user_id" },
				]
			},
		]
	});
};
