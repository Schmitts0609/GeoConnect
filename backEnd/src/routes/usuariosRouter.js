const { Router } = require("express");
const router = Router();
 
const {
  listUsuarios,
  storeUsuarios,
  listSeguindo,
  storeSeguindo,
  storeImagem,
  listPesquisa
} = require('../controller/usuariosController')
 
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

/**
 * @swagger
 * /store/imagem:
 *  post:
 *    summary: Faz o Upload de arquivos
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
router.post('/store/imagem', storeImagem);

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

module.exports = router;
