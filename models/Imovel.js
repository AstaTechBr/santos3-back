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
    endereco: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tipo_imovel: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [['apartamento', 'casa', 'terreno', 'galpao']]
        }
    },
    finalidade: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [['locacao', 'compra']]
        }
    },
    valor: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    qtd_quartos: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    suite: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    garagem: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    metragem: {
        type: DataTypes.INTEGER,
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

// Definindo relacionamento com Proprietário
Proprietario.hasMany(Imovel, { foreignKey: 'proprietario_id' });
Imovel.belongsTo(Proprietario, { foreignKey: 'proprietario_id' });

module.exports = Imovel;