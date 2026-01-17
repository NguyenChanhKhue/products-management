const express = require('express')

const router = express.Router();

const controller = require('../../controllers/admin/role.controller')

router.get('/',controller.roles)

router.get('/create' , controller.create)
router.post('/create' , controller.createPost)

// chinh sửa nhóm quyền
router.get('/edit/:id', controller.edit)
router.patch('/edit/:id', controller.editPatch)




// chi tiet nhom quyen
router.get('/detail/:id', controller.detail)

module.exports = router;