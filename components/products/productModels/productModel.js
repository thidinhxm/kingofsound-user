const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('products', {
    product_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    product_name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    model_year: {
      type: "YEAR",
      allowNull: true
    },
    descriptions: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    brand_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'brands',
        key: 'brand_id'
      }
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'categories',
        key: 'category_id'
      }
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'products',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "product_id" },
        ]
      },
      {
        name: "fk_products_brand_id",
        using: "BTREE",
        fields: [
          { name: "brand_id" },
        ]
      },
      {
        name: "fk_products_category_id",
        using: "BTREE",
        fields: [
          { name: "category_id" },
        ]
      },
    ]
  });
};
