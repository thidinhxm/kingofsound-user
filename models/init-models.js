var DataTypes = require("sequelize").DataTypes;
var _brands = require("../components/brands/brandModel");
var _categories = require("../components/categories/categoryModel");
var _carts = require("../components/carts/cartModels/cartModel");
var _comments = require("../components/comments/commentModel");
var _detailcarts = require("../components/carts/cartModels/detailcartModel");
var _detailorders = require("../components/orders/orderModels/detailorderModel");
var _images = require("../components/products/productModels/imageModel");
var _orders = require("../components/orders/orderModels/orderModel");
var _products = require("../components/products/productModels/productModel");
var _reviews = require("../components/reviews/reviewModel");
var _roles = require("../components/users/userModels/roleModel");
var _unauthusers = require("../components/carts/cartModels/unauthuserModel");
var _userroles = require("../components/users/userModels/userroleModel");
var _users = require("../components/users/userModels/userModel");
var _vouchers = require("../components/vouchers/voucherModels/voucherModel");

function initModels(sequelize) {
  var brands = _brands(sequelize, DataTypes);
  var carts = _carts(sequelize, DataTypes);
  var categories = _categories(sequelize, DataTypes);
  var comments = _comments(sequelize, DataTypes);
  var detailcarts = _detailcarts(sequelize, DataTypes);
  var detailorders = _detailorders(sequelize, DataTypes);
  var images = _images(sequelize, DataTypes);
  var orders = _orders(sequelize, DataTypes);
  var products = _products(sequelize, DataTypes);
  var reviews = _reviews(sequelize, DataTypes);
  var roles = _roles(sequelize, DataTypes);
  var unauthusers = _unauthusers(sequelize, DataTypes);
  var userroles = _userroles(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);
  var vouchers = _vouchers(sequelize, DataTypes);

  carts.belongsToMany(products, { as: 'product_id_products', through: detailcarts, foreignKey: "cart_id", otherKey: "product_id" });
  orders.belongsToMany(products, { as: 'product_id_products_detailorders', through: detailorders, foreignKey: "order_id", otherKey: "product_id" });
  products.belongsToMany(carts, { as: 'cart_id_carts', through: detailcarts, foreignKey: "product_id", otherKey: "cart_id" });
  products.belongsToMany(orders, { as: 'order_id_orders', through: detailorders, foreignKey: "product_id", otherKey: "order_id" });
  roles.belongsToMany(users, { as: 'user_id_users', through: userroles, foreignKey: "role_id", otherKey: "user_id" });
  users.belongsToMany(roles, { as: 'role_id_roles', through: userroles, foreignKey: "user_id", otherKey: "role_id" });
  products.belongsTo(brands, { as: "brand", foreignKey: "brand_id"});
  brands.hasMany(products, { as: "products", foreignKey: "brand_id"});
  detailcarts.belongsTo(carts, { as: "cart", foreignKey: "cart_id"});
  carts.hasMany(detailcarts, { as: "detailcarts", foreignKey: "cart_id"});
  unauthusers.belongsTo(carts, { as: "cart", foreignKey: "cart_id"});
  carts.hasMany(unauthusers, { as: "unauthusers", foreignKey: "cart_id"});
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
  reviews.belongsTo(products, { as: "product", foreignKey: "product_id"});
  products.hasMany(reviews, { as: "reviews", foreignKey: "product_id"});
  userroles.belongsTo(roles, { as: "role", foreignKey: "role_id"});
  roles.hasMany(userroles, { as: "userroles", foreignKey: "role_id"});
  carts.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(carts, { as: "carts", foreignKey: "user_id"});
  orders.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(orders, { as: "orders", foreignKey: "user_id"});
  reviews.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(reviews, { as: "reviews", foreignKey: "user_id"});
  userroles.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(userroles, { as: "userroles", foreignKey: "user_id"});
  orders.belongsTo(vouchers, { as: "voucher_voucher", foreignKey: "voucher"});
  vouchers.hasMany(orders, { as: "orders", foreignKey: "voucher"});

  return {
    brands,
    carts,
    categories,
    comments,
    detailcarts,
    detailorders,
    images,
    orders,
    products,
    reviews,
    roles,
    unauthusers,
    userroles,
    users,
    vouchers,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
