const Product = require("../../models/product.models")
// [GET] /products
module.exports.index =  async (req, res) => {

    const products = await Product.find({
        // loc ra cac ban ghi co status : "active"
        // status: "active",
        deleted: false
    });
    console.log(products)
    res.render("client/pages/products/index",{
        pageTitle: "trang san pham",
        products:products
    })
}

module.exports.create =  (req, res) => {
    res.render("client/pages/products/create"),{
        pageTitle:"trang create"
    }
}