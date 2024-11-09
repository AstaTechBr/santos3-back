// models/Inquilino.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');
const Imovel = require('./Imovel');

const Inquilino = sequelize.define('Inquilino', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    imovel_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Imovel,
            key: 'id'
        }
    },
    nome: {
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
    telefone1: {
        type: DataTypes.STRING,
        allowNull: false
    },
    telefone2: {
        type: DataTypes.STRING,
        allowNull: true
    },
    tempo_contrato: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    observacoes: {
        type: DataTypes.TEXT,
        allowNull: true
    }
});

Imovel.hasOne(Inquilino, { foreignKey: 'imovel_id' });
Inquilino.belongsTo(Imovel, { foreignKey: 'imovel_id' });

module.exports = Inquilino;
