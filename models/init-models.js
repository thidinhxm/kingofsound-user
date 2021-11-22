var DataTypes = require("sequelize").DataTypes;
var _brands = require("./brands");
var _categories = require("./categories");
var _comments = require("./comments");
var _detailcarts = require("./detailcarts");
var _detailorders = require("./detailorders");
var _images = require("./images");
var _orders = require("./orders");
var _products = require("./products");
var _reactions = require("./reactions");
var _roles = require("./roles");
var _user_roles = require("./user_roles");
var _users = require("./users");

function initModels(sequelize) {
  var brands = _brands(sequelize, DataTypes);
  var categories = _categories(sequelize, DataTypes);
  var comments = _comments(sequelize, DataTypes);
  var detailcarts = _detailcarts(sequelize, DataTypes);
  var detailorders = _detailorders(sequelize, DataTypes);
  var images = _images(sequelize, DataTypes);
  var orders = _orders(sequelize, DataTypes);
  var products = _products(sequelize, DataTypes);
  var reactions = _reactions(sequelize, DataTypes);
  var roles = _roles(sequelize, DataTypes);
  var user_roles = _user_roles(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  orders.belongsToMany(products, { as: 'product_id_products_detailorders', through: detailorders, foreignKey: "order_id", otherKey: "product_id" });
  products.belongsToMany(orders, { as: 'order_id_orders', through: detailorders, foreignKey: "product_id", otherKey: "order_id" });
  products.belongsToMany(users, { as: 'user_id_users', through: comments, foreignKey: "product_id", otherKey: "user_id" });
  products.belongsToMany(users, { as: 'user_id_users_detailcarts', through: detailcarts, foreignKey: "product_id", otherKey: "user_id" });
  products.belongsToMany(users, { as: 'user_id_users_reactions', through: reactions, foreignKey: "product_id", otherKey: "user_id" });
  roles.belongsToMany(users, { as: 'user_id_users_user_roles', through: user_roles, foreignKey: "role_id", otherKey: "user_id" });
  users.belongsToMany(products, { as: 'product_id_products', through: comments, foreignKey: "user_id", otherKey: "product_id" });
  users.belongsToMany(products, { as: 'product_id_products_detailcarts', through: detailcarts, foreignKey: "user_id", otherKey: "product_id" });
  users.belongsToMany(products, { as: 'product_id_products_reactions', through: reactions, foreignKey: "user_id", otherKey: "product_id" });
  users.belongsToMany(roles, { as: 'role_id_roles', through: user_roles, foreignKey: "user_id", otherKey: "role_id" });
  products.belongsTo(brands, { as: "brand", foreignKey: "brand_id"});
  brands.hasMany(products, { as: "products", foreignKey: "brand_id"});
  categories.belongsTo(categories, { as: "parent_category_category", foreignKey: "parent_category"});
  categories.hasMany(categories, { as: "categories", foreignKey: "parent_category"});
  products.belongsTo(categories, { as: "category", foreignKey: "category_id"});
  categories.hasMany(products, { as: "products", foreignKey: "category_id"});
  detailorders.belongsTo(orders, { as: "order", foreignKey: "order_id"});
  orders.hasMany(detailorders, { as: "detailorders", foreignKey: "order_id"});
  comments.belongsTo(products, { as: "product", foreignKey: "product_id"});
  products.hasMany(comments, { as: "comments", foreignKey: "product_id"});
  detailcarts.belongsTo(products, { as: "product", foreignKey: "product_id"});
  products.hasMany(detailcarts, { as: "detailcarts", foreignKey: "product_id"});
  detailorders.belongsTo(products, { as: "product", foreignKey: "product_id"});
  products.hasMany(detailorders, { as: "detailorders", foreignKey: "product_id"});
  images.belongsTo(products, { as: "product", foreignKey: "product_id"});
  products.hasMany(images, { as: "images", foreignKey: "product_id"});
  reactions.belongsTo(products, { as: "product", foreignKey: "product_id"});
  products.hasMany(reactions, { as: "reactions", foreignKey: "product_id"});
  user_roles.belongsTo(roles, { as: "role", foreignKey: "role_id"});
  roles.hasMany(user_roles, { as: "user_roles", foreignKey: "role_id"});
  comments.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(comments, { as: "comments", foreignKey: "user_id"});
  detailcarts.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(detailcarts, { as: "detailcarts", foreignKey: "user_id"});
  orders.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(orders, { as: "orders", foreignKey: "user_id"});
  reactions.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(reactions, { as: "reactions", foreignKey: "user_id"});
  user_roles.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(user_roles, { as: "user_roles", foreignKey: "user_id"});

  return {
    brands,
    categories,
    comments,
    detailcarts,
    detailorders,
    images,
    orders,
    products,
    reactions,
    roles,
    user_roles,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
