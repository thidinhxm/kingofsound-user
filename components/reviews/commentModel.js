const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('comments', {
    comment_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'user_id'
      }
    },
    product_id: {
      type: DataTypes.INTEGER,
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
    parent_comment: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'comments',
        key: 'comment_id'
      }
    },
    created_at: {
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
        name: "fk_comments_user_id",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "fk_comments_product_id",
        using: "BTREE",
        fields: [
          { name: "product_id" },
        ]
      },
      {
        name: "fk_comments_parent_comment",
        using: "BTREE",
        fields: [
          { name: "parent_comment" },
        ]
      },
    ]
  });
};
