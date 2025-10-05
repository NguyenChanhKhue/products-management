const express = require('express')

const router = express.Router();

const controller = require("../../controllers/admin/product.controller") // controller = {products : asyncfuntion}
router.get('/',controller.products)

// :var dùng để truyền data động
router.patch('/change-status/:status/:id',controller.changeStatus) // đổi trạng thái hiện thời của sản phẩm

module.exports = router;