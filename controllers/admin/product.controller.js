// trang tong quan
module.exports.products = (req, res) => {
    res.render("admin/pages/products/index",{
      pageTitle: "Danh sách sản phẩm "
    }
    )
 }