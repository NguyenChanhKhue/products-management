const Product = require("../../models/product.models")
// [GET] /products
module.exports.index = async (req, res) => {

    const products = await Product.find({
        // loc ra cac ban ghi co status : "active"
        // status: "active",
        deleted: false
    });
    res.render("client/pages/products/index", {
        pageTitle: "trang san pham",
        products: products
    })
}

//[GET] /product/:slug
module.exports.detail = async (req, res) => {
    try {
        const find = {
            deleted:false,
            slug: req.params.slug
        }
        const product = await Product.findOne(find)
        res.render(`client/pages/products/detail`,{
            pageTitle: product.title,
            product:product
        })
    } catch (error) {
        res.redirect(`products`)
    }
}

