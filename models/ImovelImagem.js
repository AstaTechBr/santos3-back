// models/ImovelImagem.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');
const Imovel = require('./Imovel');

const ImovelImagem = sequelize.define('imovelimagem', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    imovel_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Imovel,
            key: 'id'
        }
    },
    url_imagem: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

// Definir relação entre Imovel e ImovelImagem
Imovel.hasMany(ImovelImagem, { foreignKey: 'imovel_id', onDelete: 'CASCADE' });
ImovelImagem.belongsTo(Imovel, { foreignKey: 'imovel_id' });

module.exports = ImovelImagem;
