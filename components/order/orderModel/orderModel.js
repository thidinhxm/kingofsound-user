const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('orders', {
    order_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    create_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    send_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    order_total: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'user_id'
      }
    },
    order_status: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    payment_status: {
      type: DataTypes.STRING(30),
      allowNull: false,
      defaultValue: "Chưa thanh toán"
    },
    receive_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    receive_address: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    receive_phone: {
      type: DataTypes.CHAR(11),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'orders',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "order_id" },
        ]
      },
      {
        name: "fk_orders_user_id",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
};
