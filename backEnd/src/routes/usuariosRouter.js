const { Router } = require("express");
const router = Router();
const multer = require('multer');
const path = require('path');
const connection = require("../config/db");


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
  listPesquisa,
  getUserProfile,
  verificaSegue,
  seguirUsuario,
  deixarDeSeguir
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

// Rotas para seguir e deixar de seguir usuários
router.post('/follow', seguirUsuario);
router.post('/unfollow', deixarDeSeguir);

// Rota para verificar se um usuário segue outro
router.get('/segue/:followerId/:followingId', verificaSegue);

// Rota para obter o perfil do usuário
router.get('/perfil/:id', getUserProfile);

module.exports = router;