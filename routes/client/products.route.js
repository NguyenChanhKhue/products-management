const express = require('express')

const router = express.Router();

const controller = require("../../controllers/client/product.controller")


// main page of products
router.get('/',controller.index)

//create page of products
router.get('/create' , controller.create)


module.exports = router;