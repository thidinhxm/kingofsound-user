const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
	return sequelize.define('detailorders', {
		order_id: {
			type: DataTypes.STRING(20),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'orders',
				key: 'order_id'
			}
		},
		product_id: {
			type: DataTypes.STRING(20),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'products',
				key: 'product_id'
			}
		},
		quantity: {
			type: DataTypes.INTEGER,
			allowNull: true
		}
	}, {
		sequelize,
		tableName: 'detailorders',
		timestamps: false,
		indexes: [
			{
				name: "PRIMARY",
				unique: true,
				using: "BTREE",
				fields: [
					{ name: "order_id" },
					{ name: "product_id" },
				]
			},
			{
				name: "fk_Product_order",
				using: "BTREE",
				fields: [
					{ name: "product_id" },
				]
			},
		]
	});
};
