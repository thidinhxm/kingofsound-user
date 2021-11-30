const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
	return sequelize.define('reviews', {
		user_id: {
			type: DataTypes.CHAR(20),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'users',
				key: 'user_id'
			}
		},
		product_id: {
			type: DataTypes.CHAR(20),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'products',
				key: 'product_id'
			}
		},
		rating: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		review: {
			type: DataTypes.TEXT,
			allowNull: true
		}
	}, {
		sequelize,
		tableName: 'reviews',
		timestamps: false,
		indexes: [
			{
				name: "PRIMARY",
				unique: true,
				using: "BTREE",
				fields: [
					{ name: "user_id" },
					{ name: "product_id" },
				]
			},
			{
				name: "fk_reviews_products_idx",
				using: "BTREE",
				fields: [
					{ name: "product_id" },
				]
			},
		]
	});
};
