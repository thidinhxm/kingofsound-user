const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
	return sequelize.define('comments', {
		comment_id: {
			type: DataTypes.STRING(20),
			allowNull: false,
			primaryKey: true
		},
		user_id: {
			type: DataTypes.CHAR(20),
			allowNull: false,
			references: {
				model: 'users',
				key: 'user_id'
			}
		},
		product_id: {
			type: DataTypes.CHAR(20),
			allowNull: false,
			references: {
				model: 'products',
				key: 'product_id'
			}
		},
		descriptions: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		parent_comment_id: {
			type: DataTypes.STRING(20),
			allowNull: true,
			references: {
				model: 'comments',
				key: 'comment_id'
			}
		},
		createat: {
			type: DataTypes.DATEONLY,
			allowNull: true
		}
	}, {
		sequelize,
		tableName: 'comments',
		timestamps: false,
		indexes: [
			{
				name: "PRIMARY",
				unique: true,
				using: "BTREE",
				fields: [
					{ name: "comment_id" },
				]
			},
			{
				name: "fk_product_comment",
				using: "BTREE",
				fields: [
					{ name: "product_id" },
				]
			},
			{
				name: "fk_author_comment",
				using: "BTREE",
				fields: [
					{ name: "user_id" },
				]
			},
			{
				name: "fk_comments_comments1",
				using: "BTREE",
				fields: [
					{ name: "parent_comment_id" },
				]
			},
		]
	});
};
