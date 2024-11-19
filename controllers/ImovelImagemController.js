// controllers/ImovelImagemController.js
const ImovelImagem = require('../models/ImovelImagem');
const Imovel = require('../models/Imovel');

// Criar uma nova imagem para um imóvel
exports.createImovelImage = async (req, res) => {
    try {
        const { imovel_id } = req.body;
        const url_imagem = req.file.filename; // Assumindo que o upload de arquivo já foi configurado

        const newImovelImage = await ImovelImagem.create({ imovel_id, url_imagem });
        res.status(201).json(newImovelImage);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar a imagem', error });
    }
};

// Buscar todas as imagens de um imóvel específico
exports.getAllImovelImages = async (req, res) => {
    try {
        const { imovel_id } = req.params; // Supondo que o ID do imóvel venha nos parâmetros da URL
        const imovelImages = await ImovelImagem.findAll({ where: { imovel_id } });
        res.status(200).json(imovelImages);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar as imagens', error });
    }
};

// Buscar uma imagem específica por ID
exports.getImovelImageById = async (req, res) => {
    try {
        const imovelImage = await ImovelImagem.findByPk(req.params.id);
        if (!imovelImage) {
            return res.status(404).json({ message: 'Imagem não encontrada' });
        }
        res.status(200).json(imovelImage);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar a imagem', error });
    }
};

// Excluir uma imagem por ID
exports.deleteImovelImageById = async (req, res) => {
    try {
        const deletedImage = await ImovelImagem.destroy({ where: { id: req.params.id } });
        if (!deletedImage) {
            return res.status(404).json({ message: 'Imagem não encontrada' });
        }
        res.status(200).json({ message: 'Imagem excluída com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao excluir a imagem', error });
    }
};
