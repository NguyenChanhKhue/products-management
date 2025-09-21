const Products = require("../../models/product.models")

// [GET] /admin/products
module.exports.products = async (req, res) => {
  const products = await Products.find({
    // deleted: false
  })
  console.log(products)
  res.render("admin/pages/products/index",{
    pageTitle: "Danh sách sản phẩm ",
    products:products
  })
 }