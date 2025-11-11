const express = require('express')

const router = express.Router();

const multer = require('multer') // upload file 
const upload = multer()


const validate = require("../../validate/admin/product.validate")

const uploadCloud = require('../../middlewares/admin/uploadCloudMiddlewares')


const controller = require("../../controllers/admin/product.controller") // controller = {products : asyncfuntion}

router.get('/', controller.products)

// :var dùng để truyền data động
router.patch('/change-status/:status/:id', controller.changeStatus) // đổi trạng thái hiện thời của sản phẩm

router.delete('/delete/:id', controller.deleteItem) // xoa 1 san pham

router.get('/create', controller.create) // trả về giao diện [GET]

router.post(
    '/create', upload.single('thumbnail'),
    uploadCloud.upload,
    validate.createPost, // giống như middleware , check xem co thoả validate không rồi mới tạo sản phẩm
    controller.createProducts

) // post 1 sp lên

// sửa sản phẩm

router.get('/edit/:id', controller.edit)

router.patch(
    '/edit/:id',
    upload.single('thumbnail'),
    validate.createPost,
    controller.editPatch,

) // chinh sua


// chi tiet san pham
router.get('/detail/:id', controller.detail)

module.exports = router;