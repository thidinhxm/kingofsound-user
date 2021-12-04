const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('categories', {
    category_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    category_name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    descriptions: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    parent_category: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'categories',
        key: 'category_id'
      }
    }
  }, {
    sequelize,
    tableName: 'categories',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "category_id" },
        ]
      },
      {
        name: "fk_categories_parent_category",
        using: "BTREE",
        fields: [
          { name: "parent_category" },
        ]
      },
    ]
  });
};
