// controllers/InquilinoController.js
const Inquilino = require('../models/Inquilino');
const Imovel = require('../models/Imovel');

// Criar um novo inquilino
const createInquilino = async (req, res) => {
    try {
        const inquilino = await Inquilino.create(req.body);
        res.status(201).json(inquilino);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Listar todos os inquilinos
const getAllInquilinos = async (req, res) => {
    try {
        const inquilinos = await Inquilino.findAll({
            include: [{ model: Imovel, attributes: ['id', 'endereco'] }]
        });
        res.status(200).json(inquilinos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Buscar um inquilino por ID
const getInquilinoById = async (req, res) => {
    try {
        const inquilino = await Inquilino.findByPk(req.params.id, {
            include: [{ model: Imovel, attributes: ['id', 'endereco'] }]
        });
        if (inquilino) {
            res.status(200).json(inquilino);
        } else {
            res.status(404).json({ error: 'Inquilino não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Atualizar um inquilino
const updateInquilino = async (req, res) => {
    try {
        const inquilino = await Inquilino.findByPk(req.params.id);
        if (inquilino) {
            await inquilino.update(req.body);
            res.status(200).json(inquilino);
        } else {
            res.status(404).json({ error: 'Inquilino não encontrado' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Excluir um inquilino
const deleteInquilino = async (req, res) => {
    try {
        const inquilino = await Inquilino.findByPk(req.params.id);
        if (inquilino) {
            await inquilino.destroy();
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'Inquilino não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createInquilino,
    getAllInquilinos,
    getInquilinoById,
    updateInquilino,
    deleteInquilino
};
