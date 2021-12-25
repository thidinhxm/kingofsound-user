const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('unauthusers', {
    unauth_id: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      primaryKey: true
    },
    cart_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'carts',
        key: 'cart_id'
      }
    }
  }, {
    sequelize,
    tableName: 'unauthusers',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "unauth_id" },
        ]
      },
      {
        name: "fk_unauthusers_cart_id",
        using: "BTREE",
        fields: [
          { name: "cart_id" },
        ]
      },
    ]
  });
};
