const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('santos3', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;