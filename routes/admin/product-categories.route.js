const express = require('express')

const router = express.Router();

const multer = require('multer') // upload file 
const upload = multer()


const validate = require("../../validate/admin/product-categories.validate")

const uploadCloud = require('../../middlewares/admin/uploadCloudMiddlewares')

const controller = require("../../controllers/admin/product-categories.controller") // controller = {products : asyncfuntion}




router.get('/', controller.productCategories)

router.get('/create' , controller.create)

router.post(
    '/create', upload.single('thumbnail'),
    uploadCloud.upload,
    validate.createPost, // giống như middleware , check xem co thoả validate không rồi mới tạo sản phẩm
    controller.createProducts

) // post 1 sp lên

// chi tiet san pham
router.get('/detail/:id', controller.detail)

module.exports = router;