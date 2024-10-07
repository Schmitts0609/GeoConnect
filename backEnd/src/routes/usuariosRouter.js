const { Router } = require("express");
const router = Router();

const { storeUsuarios, listUsuarios } = require('../controller/usuariosController');

router.post("/store/usuarios", storeUsuarios);
router.post("/list/usuarios", listUsuarios);

module.exports = router;