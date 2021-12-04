var DataTypes = require("sequelize").DataTypes;
var _brands = require("../components/brands/brandModel");
var _categories = require("../components/categories/categoryModel");
var _comments = require("../components/reviews/commentModel");
var _detailcarts = require("../components/order/detailcartModel");
var _detailorders = require("../components/order/detailorderModel");
var _images = require("../components/products/productModels/imageModel");
var _orders = require("../components/order/orderModel");
var _products = require("../components/products/productModels/productModel");
var _reviews = require("../components/reviews/reviewModel");
var _roles = require("../components/users/userModels/roleModel");
var _userroles = require("../components/users/userModels/userroleModel");
var _users = require("../components/users/userModels/userModel");

function initModels(sequelize) {
  var brands = _brands(sequelize, DataTypes);
  var categories = _categories(sequelize, DataTypes);
  var comments = _comments(sequelize, DataTypes);
  var detailcarts = _detailcarts(sequelize, DataTypes);
  var detailorders = _detailorders(sequelize, DataTypes);
  var images = _images(sequelize, DataTypes);
  var orders = _orders(sequelize, DataTypes);
  var products = _products(sequelize, DataTypes);
  var reviews = _reviews(sequelize, DataTypes);
  var roles = _roles(sequelize, DataTypes);
  var userroles = _userroles(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  orders.belongsToMany(products, { as: 'product_id_products_detailorders', through: detailorders, foreignKey: "order_id", otherKey: "product_id" });
  products.belongsToMany(orders, { as: 'order_id_orders', through: detailorders, foreignKey: "product_id", otherKey: "order_id" });
  products.belongsToMany(users, { as: 'user_id_users', through: detailcarts, foreignKey: "product_id", otherKey: "user_id" });
  roles.belongsToMany(users, { as: 'user_id_users_userroles', through: userroles, foreignKey: "role_id", otherKey: "user_id" });
  users.belongsToMany(products, { as: 'product_id_products', through: detailcarts, foreignKey: "user_id", otherKey: "product_id" });
  users.belongsToMany(roles, { as: 'role_id_roles', through: userroles, foreignKey: "user_id", otherKey: "role_id" });
  products.belongsTo(brands, { as: "brand", foreignKey: "brand_id"});
  brands.hasMany(products, { as: "products", foreignKey: "brand_id"});
  categories.belongsTo(categories, { as: "parent_category_category", foreignKey: "parent_category"});
  categories.hasMany(categories, { as: "categories", foreignKey: "parent_category"});
  products.belongsTo(categories, { as: "category", foreignKey: "category_id"});
  categories.hasMany(products, { as: "products", foreignKey: "category_id"});
  comments.belongsTo(comments, { as: "parent_comment_comment", foreignKey: "parent_comment"});
  comments.hasMany(comments, { as: "comments", foreignKey: "parent_comment"});
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
  reviews.belongsTo(products, { as: "product", foreignKey: "product_id"});
  products.hasMany(reviews, { as: "reviews", foreignKey: "product_id"});
  userroles.belongsTo(roles, { as: "role", foreignKey: "role_id"});
  roles.hasMany(userroles, { as: "userroles", foreignKey: "role_id"});
  comments.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(comments, { as: "comments", foreignKey: "user_id"});
  detailcarts.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(detailcarts, { as: "detailcarts", foreignKey: "user_id"});
  orders.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(orders, { as: "orders", foreignKey: "user_id"});
  reviews.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(reviews, { as: "reviews", foreignKey: "user_id"});
  userroles.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(userroles, { as: "userroles", foreignKey: "user_id"});

  return {
    brands,
    categories,
    comments,
    detailcarts,
    detailorders,
    images,
    orders,
    products,
    reviews,
    roles,
    userroles,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
