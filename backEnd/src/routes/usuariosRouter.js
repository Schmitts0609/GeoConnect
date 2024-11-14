const { Router } = require("express");
const router = Router();
const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..', 'uploads'));
  },
  filename: function (req, file, cb) {

    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, uniqueSuffix);
  }
});

const upload = multer({ storage: storage });

const {
  listUsuarios,
  storeUsuarios,
  listSeguindo,
  storeSeguindo,
  storeImagem,
  listPesquisa
} = require('../controller/usuariosController');

/**
 * @swagger
 * /list/usuarios:
 *  get:
 *    summary: Retorna os usuarios do banco de dados
 *    response:
 *      200:
 *        description: Usuarios retornados
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 */
router.post('/list/usuarios', listUsuarios);

/**
 * @swagger
 * /list/seguindo:
 *  get:
 *    summary: Lista quem o usuario segue
 *    response:
 *      200:
 *        description: Usuarios retornados
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 */
router.post('/list/seguindo', listSeguindo);

/**
 * @swagger
 * /store/usuarios:
 *  post:
 *    summary: Insere os usuarios no banco de dados
 *    response:
 *      200:
 *        description: Sucesso!
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 */
router.post('/store/usuarios', storeUsuarios);

/**
 * @swagger
 * /store/seguindo:
 *  post:
 *    summary: Insere as contas que o usuario segue
 *    response:
 *      200:
 *        description: Sucesso!
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 */
router.post('/store/seguindo', storeSeguindo);

// /**
//  * @swagger
//  * /store/imagem:
//  *  post:
//  *    summary: Faz o Upload de arquivos
//  *    response:
//  *      200:
//  *        description: Sucesso!
//  *        content:
//  *          application/json:
//  *            schema:
//  *              type: array
//  *              items:
//  *                type: object
//  */
// router.post('/store/imagem', upload.single('inputImage'), storeImagem);

/**
 * @swagger
 * /list/pesquisa:
 *  post:
 *    summary: Pesquisa os usuários no banco
 *    response:
 *      200:
 *        description: Sucesso!
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 */
router.post('/list/pesquisa', listPesquisa);

router.post('/store/imagem', (req, res) => {
  upload.single('inputImagem')(req, res, function(err) {
    if (err) {
      // Ocorreu um erro durante o upload
      console.error('Erro no Multer:', err);
      return res.status(500).json({
        success: false,
        message: 'Erro ao processar o arquivo.',
        error: err.message
      });
    }
    // Chama a função storeImagem
    storeImagem(req, res);
  });
});

module.exports = router;
