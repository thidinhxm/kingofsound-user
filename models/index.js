 const Sequelize = require('sequelize');

const initModels = require('./init-models');

const sequelize = new Sequelize(
    process.env.DB_DATABASE || 'mystore', 
    process.env.DB_USERNAME || 'root', 
    process.env.DB_PASSWORD || '10diemweb@', {
    host:   process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
});


module.exports = {
    sequelize: sequelize,
    models: initModels(sequelize),
};