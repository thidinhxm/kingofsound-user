const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('orders', {
    order_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    total_price: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
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
      type: DataTypes.ENUM('Đang chờ xử lý','Đang giao','Đã giao', 'Đã hủy'),
      allowNull: true,
      defaultValue: "Đang chờ xử lý"
    },
    payment_status: {
      type: DataTypes.ENUM('Chưa thanh toán','Đã thanh toán'),
      allowNull: false,
      defaultValue: "Chưa thanh toán"
    },
    receive_address: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    receive_phone: {
      type: DataTypes.CHAR(11),
      allowNull: false
    },
    voucher: {
      type: DataTypes.CHAR(10),
      allowNull: true,
      references: {
        model: 'vouchers',
        key: 'voucher_id'
      }
    },
    create_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    send_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    receive_date: {
      type: DataTypes.DATE,
      allowNull: true
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
      {
        name: "fk_orders_voucher",
        using: "BTREE",
        fields: [
          { name: "voucher" },
        ]
      },
    ]
  });
};
