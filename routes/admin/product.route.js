const express = require('express')

const router = express.Router();

const storageMulter = require('../../helpers/storageMulter')
const multer  = require('multer') // upload file 
const upload = multer({ storage: storageMulter()})

const controller = require("../../controllers/admin/product.controller") // controller = {products : asyncfuntion}
router.get('/',controller.products)

// :var dùng để truyền data động
router.patch('/change-status/:status/:id',controller.changeStatus) // đổi trạng thái hiện thời của sản phẩm

router.delete('/delete/:id',controller.deleteItem) // xoa 1 san pham

router.get('/create', controller.create) // trả về giao diện [GET]

router.post('/create', upload.single('thumbnail') ,controller.createProducts) // post 1 sp lên

module.exports = router;