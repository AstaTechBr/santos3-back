// models/Imovel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');
const Proprietario = require('./Proprietario');

const Imovel = sequelize.define('Imovel', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    proprietario_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Proprietario,
            key: 'id'
        }
    },
    codigo_referencia: {
        type: DataTypes.STRING,
        allowNull: false
    },
    endereco: {
        type: DataTypes.STRING,
        allowNull: false
    },
    qtd_comodos: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    suite: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    garagem: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    individual: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    disponivel: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    observacoes: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    apartamento_num: {
        type: DataTypes.STRING,
        allowNull: true
    },
    andar: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    sacada: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    vagas: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    elevador: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    condominio_incluso: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    iptu_incluso: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    destaque: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});

Proprietario.hasMany(Imovel, { foreignKey: 'proprietario_id' });
Imovel.belongsTo(Proprietario, { foreignKey: 'proprietario_id' });

module.exports = Imovel;
