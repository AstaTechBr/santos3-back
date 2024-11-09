// controllers/ImovelImagemController.js
const ImovelImagem = require('../models/ImovelImagem');
const Imovel = require('../models/Imovel');
const path = require('path');

// Criar uma nova imagem para um imóvel
const createImagem = async (req, res) => {
    try {
        const { imovel_id } = req.params;
        const { descricao } = req.body;

        // Verifica se o arquivo de imagem foi enviado e se `imovel_id` não é nulo
        if (!req.file) {
            return res.status(400).json({ error: "Arquivo de imagem é obrigatório." });
        }

        // Define o caminho da imagem a partir do nome do arquivo salvo
        const imageUrl = `/uploads/${req.file.filename}`;

        // Cria o registro da imagem no banco de dados
        const imagem = await ImovelImagem.create({
            imovel_id,
            url_imagem: imageUrl,
        });

        res.status(201).json(imagem);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Listar todas as imagens de um imóvel
const getAllImagensByImovel = async (req, res) => {
    try {
        const { imovel_id } = req.params;
        const imagens = await ImovelImagem.findAll({ where: { imovel_id } });
        res.status(200).json(imagens);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Buscar uma imagem específica por ID
const getImagemById = async (req, res) => {
    try {
        const { id } = req.params;
        const imagem = await ImovelImagem.findByPk(id, {
            include: [{ model: Imovel, attributes: ['codigo_referencia'] }]
        });
        if (imagem) {
            res.status(200).json(imagem);
        } else {
            res.status(404).json({ error: 'Imagem não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Atualizar uma imagem
const updateImagem = async (req, res) => {
    try {
        const { id } = req.params;
        const { url_imagem, descricao } = req.body;
        const imagem = await ImovelImagem.findByPk(id);

        if (imagem) {
            await imagem.update({ url_imagem, descricao });
            res.status(200).json(imagem);
        } else {
            res.status(404).json({ error: 'Imagem não encontrada' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Excluir uma imagem
const deleteImagem = async (req, res) => {
    try {
        const { id } = req.params;
        const imagem = await ImovelImagem.findByPk(id);

        if (imagem) {
            await imagem.destroy();
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'Imagem não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createImagem,
    getAllImagensByImovel,
    getImagemById,
    updateImagem,
    deleteImagem
};
