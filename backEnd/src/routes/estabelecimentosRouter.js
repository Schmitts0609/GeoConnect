const { Router } = require("express");
const router = Router();

const { storeEstabelecimentos } = require('../controller/estabelecimentosController');

router.post("/store/estabelecimentos", storeEstabelecimentos);

module.exports = router;