// routes/imovelRoutes.js
const express = require('express');
const router = express.Router();
const ImovelController = require('../controllers/ImovelController');
const InquilinoController = require('../controllers/InquilinoController');
const ProprietarioController = require('../controllers/ProprietarioController');
const ImovelImagemController = require('../controllers/ImovelImagemController');
const upload = require('../middlewares/multerConfig');


/*---------IMOVEL---------------*/
router.post('/imovel', ImovelController.createImovel);
router.get('/imoveis', ImovelController.getAllImoveis);
router.get('/imoveis/:id', ImovelController.getImovelById);
router.put('/imoveis/atualizar/:id', ImovelController.updateImovel);
router.delete('/imoveis/deletar/:id', ImovelController.deleteImovel);


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



/*---------IMOVEL IMAGENS---------------*/
router.post('/imovel/:imovel_id/imagens', upload.single('imagem'), ImovelImagemController.createImagem);
router.get('/imovel/:imovel_id/imagens', ImovelImagemController.getAllImagensByImovel);
router.get('/imagens/:id', ImovelImagemController.getImagemById);
router.put('/imagens/:id', ImovelImagemController.updateImagem);
router.delete('/imagens/:id', ImovelImagemController.deleteImagem);


module.exports = router;
