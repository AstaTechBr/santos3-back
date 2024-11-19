// routes/imovelRoutes.js
const express = require('express');
const router = express.Router();
const ImovelController = require('../controllers/ImovelController');
const InquilinoController = require('../controllers/InquilinoController');
const ProprietarioController = require('../controllers/ProprietarioController');


/*---------IMOVEL---------------*/
router.post('/imovel', ImovelController.createImovel);
router.get('/imoveis', ImovelController.getAllImoveis);
router.get('/imoveis/:id', ImovelController.getImovelById);
router.put('/imoveis/atualizar/:id', ImovelController.updateImovel);
router.delete('/imoveis/deletar/:id', ImovelController.deleteImovel);
router.get('/imoveisFiltro', ImovelController.getFilteredImoveis);


/*---------INQUILINO------------*/
router.post('/inquilino', InquilinoController.createInquilino);
router.get('/inquilinos', InquilinoController.getAllInquilinos);
router.get('/inquilinos/:id', InquilinoController.getInquilinoById);
router.put('/inquilinos/atualizar/:id', InquilinoController.updateInquilino);
router.delete('/inquilinos/deletar/:id', InquilinoController.deleteInquilino);


/*------------PROPRIETARIO-------*/
router.post('/proprietario', ProprietarioController.createProprietario);
router.get('/proprietarios', ProprietarioController.getAllProprietarios);
router.get('/proprietarios/:id', ProprietarioController.getProprietarioById);
router.put('/proprietarios/atualizar/:id', ProprietarioController.updateProprietario);
router.delete('/proprietarios/deletar/:id', ProprietarioController.deleteProprietario);


// routes/imovelImagemRoutes.js
const multer = require('multer');
const path = require('path');
const { 
    createImovelImage, 
    getAllImovelImages, 
    getImovelImageById,  
    deleteImovelImageById
} = require('../controllers/ImovelImagemController');

function createMulter(destination) {
    return multer({
        storage: multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, destination);
            },
            filename: function (req, file, cb) {
                const date = new Date().toISOString().replace(/[^a-zA-Z0-9]/g, '');
                cb(null, date + path.extname(file.originalname));
            },
        }),
    });
}

// Rota para criar uma nova imagem de imóvel
router.post('/imovelImagem', createMulter('./images').single('image'), createImovelImage);

// Rota para listar todas as imagens de um imóvel
router.get('/imovelImagem', getAllImovelImages);

// Rota para buscar uma imagem de imóvel por ID
router.get('/imovelImagem/:id', getImovelImageById);

// Rota para excluir uma imagem de imóvel por ID
router.delete('/imovelImagem/:id', deleteImovelImageById);

module.exports = router;



module.exports = router;
