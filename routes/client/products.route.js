const express = require('express')

const router = express.Router();

const controller = require("../../controllers/client/product.controller")


// main page of products
router.get('/',controller.index)



router.get(`/:slug`, controller.detail)

module.exports = router;