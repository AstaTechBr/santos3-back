// models/Proprietario.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');

const Proprietario = sequelize.define('Proprietario', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rg: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cpf: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    data_nascimento: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    endereco: {
        type: DataTypes.STRING,
        allowNull: false
    },
    telefone: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Proprietario;
