const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
	return sequelize.define('roles', {
		role_id: {
			type: DataTypes.CHAR(20),
			allowNull: false,
			primaryKey: true
		},
		role_name: {
			type: DataTypes.STRING(50),
			allowNull: true
		}
	}, {
		sequelize,
		tableName: 'roles',
		timestamps: false,
		indexes: [
			{
				name: "PRIMARY",
				unique: true,
				using: "BTREE",
				fields: [
					{ name: "role_id" },
				]
			},
		]
	});
};
