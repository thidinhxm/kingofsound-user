const Sequelize = require('sequelize');

const initModels = require('./init-models');
const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
});


module.exports = {
    sequelize: sequelize,
    models: initModels,
};