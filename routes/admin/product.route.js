const express = require('express')

const router = express.Router();

const controller = require("../../controllers/admin/product.controller") // controller = {products : asyncfuntion}
router.get('/',controller.products)

module.exports = router;