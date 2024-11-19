// controllers/ProprietarioController.js
const Proprietario = require('../models/Proprietario');

// Criar um novo proprietário
const createProprietario = async (req, res) => {
    try {
        const { nome, rg, cpf, data_nascimento, endereco, telefone} = req.body;
        const novoProprietario = await Proprietario.create({
            nome,
            rg,
            cpf,
            data_nascimento,
            endereco,
            telefone
        
        });
        res.status(201).json(novoProprietario);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar proprietário', error: error.message });
    }
};

// Listar todos os proprietários
const getAllProprietarios = async (req, res) => {
    try {
        const proprietarios = await Proprietario.findAll();
        res.status(200).json(proprietarios);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar proprietários', error: error.message });
    }
};

// Obter um proprietário pelo ID
const getProprietarioById = async (req, res) => {
    try {
        const { id } = req.params;
        const proprietario = await Proprietario.findByPk(id);
        if (!proprietario) {
            return res.status(404).json({ message: 'Proprietário não encontrado' });
        }
        res.status(200).json(proprietario);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar proprietário', error: error.message });
    }
};

// Atualizar um proprietário pelo ID
const updateProprietario = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, rg, cpf, data_nascimento, endereco, telefone } = req.body;
        const proprietario = await Proprietario.findByPk(id);

        if (!proprietario) {
            return res.status(404).json({ message: 'Proprietário não encontrado' });
        }

        await proprietario.update({
            nome,
            rg,
            cpf,
            data_nascimento,
            endereco,
            telefone
        
        });
        res.status(200).json(proprietario);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar proprietário', error: error.message });
    }
};

// Excluir um proprietário pelo ID
const deleteProprietario = async (req, res) => {
    try {
        const { id } = req.params;
        const proprietario = await Proprietario.findByPk(id);

        if (!proprietario) {
            return res.status(404).json({ message: 'Proprietário não encontrado' });
        }

        await proprietario.destroy();
        res.status(200).json({ message: 'Proprietário excluído com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao excluir proprietário', error: error.message });
    }
};


module.exports = {
    createProprietario,
    getAllProprietarios,
    getProprietarioById,
    updateProprietario,
    deleteProprietario
};