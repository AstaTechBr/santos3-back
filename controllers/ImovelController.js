// controllers/ImovelController.js
const Imovel = require('../models/Imovel');
const { Op } = require('sequelize');
const Proprietario = require('../models/Proprietario');
const ImovelImagem = require('../models/ImovelImagem')
const sequelize = require('../config/config')

// Criar um novo imóvel
const createImovel = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        // 1. Criar o imóvel usando os dados enviados no corpo da requisição
        const imovel = await Imovel.create(req.body, { transaction });

        // 2. Verificar se há imagens enviadas
        if (req.files && req.files.length > 0) {
            // Mapear as imagens para serem inseridas na tabela de imagens
            const imagens = req.files.map(file => ({
                url_imagem: file.filename, // Ou ajuste conforme o nome do arquivo/método de upload
                imovel_id: imovel.id, // Relacionamento com o imóvel
            }));

            // 3. Inserir as imagens relacionadas ao imóvel
            await ImovelImagem.bulkCreate(imagens, { transaction });
        }

        // 4. Confirmar a transação
        await transaction.commit();

        // 5. Retornar o imóvel com sucesso
        res.status(201).json(imovel);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Listar todos os imóveis
const getAllImoveis = async (req, res) => {
    try {
        const imoveis = await Imovel.findAll({
            include: [
                { model: ImovelImagem, attributes: ['url_imagem'] }
            ]
        });
        res.status(200).json(imoveis);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Buscar um imóvel por ID
const getImovelById = async (req, res) => {
    try {
        const imovel = await Imovel.findByPk(req.params.id, {
            include: [
                { model: ImovelImagem, attributes: ['url_imagem'] }
            ]
        });
        if (imovel) {
            res.status(200).json(imovel);
        } else {
            res.status(404).json({ error: 'Imóvel não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Atualizar um imóvel
const updateImovel = async (req, res) => {
    try {
        const imovel = await Imovel.findByPk(req.params.id);
        if (imovel) {
            await imovel.update(req.body);
            res.status(200).json(imovel);
        } else {
            res.status(404).json({ error: 'Imóvel não encontrado' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Excluir um imóvel
const deleteImovel = async (req, res) => {
    try {
        const imovel = await Imovel.findByPk(req.params.id);
        if (imovel) {
            await imovel.destroy();
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'Imóvel não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getFilteredImoveis = async (req, res) => {
    try {
        const filters = {};

        // Adicionar filtros somente se os parâmetros de consulta estiverem presentes
        if (req.query.tipo_imovel) {
            filters.tipo_imovel = req.query.tipo_imovel;
        }
        if (req.query.finalidade) {
            filters.finalidade = req.query.finalidade;
        }
        if (req.query.min_valor || req.query.max_valor) {
            filters.valor = {};
            if (req.query.min_valor) {
                filters.valor[Op.gte] = parseFloat(req.query.min_valor);
            }
            if (req.query.max_valor) {
                filters.valor[Op.lte] = parseFloat(req.query.max_valor);
            }
        }
        if (req.query.qtd_quartos) {
            filters.qtd_quartos = parseInt(req.query.qtd_quartos, 10);
        }
        if (req.query.metragem_min || req.query.metragem_max) {
            filters.metragem = {};
            if (req.query.metragem_min) {
                filters.metragem[Op.gte] = parseInt(req.query.metragem_min, 10);
            }
            if (req.query.metragem_max) {
                filters.metragem[Op.lte] = parseInt(req.query.metragem_max, 10);
            }
        }
        if (req.query.sacada) {
            filters.sacada = req.query.sacada === 'true';
        }
        if (req.query.elevador) {
            filters.elevador = req.query.elevador === 'true';
        }
        if (req.query.destaque) {
            filters.destaque = req.query.destaque === 'true';
        }

        // Buscar imóveis com base nos filtros aplicados
        const imoveis = await Imovel.findAll({ where: filters });
        res.status(200).json(imoveis);
    } catch (error) {
        console.error("Erro ao buscar imóveis:", error);
        res.status(500).json({ error: 'Erro ao buscar imóveis filtrados' });
    }
};

const getImoveisDestaquesTrue = async (req, res) => {
    try {
        const imoveis = await Imovel.findAll({
            where: {
                destaque: true,  
            },
            include: [
                { model: ImovelImagem, attributes: ['url_imagem'] }
            ]
        });

        // Retorna a resposta com os imóveis encontrados
        res.status(200).json(imoveis);
    } catch (error) {
        // Caso ocorra algum erro, retorna um erro 500
        res.status(500).json({ error: error.message });
    }
};


module.exports = {
    createImovel,
    getAllImoveis,
    getImovelById,
    updateImovel,
    deleteImovel,
    getFilteredImoveis,
    getImoveisDestaquesTrue
};
