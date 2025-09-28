const Products = require("../../models/product.models")

const fillterStatusHelper = require("../../helpers/fillterStatus")

// [GET] /admin/products
module.exports.products = async (req, res) => {
  // tạo ra 1 obj có property là obj =  {products : async}
  // console.log(req.query.status) lay ra trang thai khi press vao button (active , inactive)

  //Bộ lọc
  const fillterStatus = fillterStatusHelper(req.query)

  console.log(fillterStatus)

  let find = {
    // dung de loc ra cac san pham
    deleted : false,
    // title: 'iPhone 9'
    // status: active
  }
  if(req.query.status){
    find.status = req.query.status  // truyền active vào find để lọc ra sản phẩm
  }

  let keyword ="" // luu tu khoa nguoi dung nhap vao o tim kiem

  if(req.query.keyword){
    keyword = req.query.keyword

    const regex = new RegExp(keyword , "i") // tim tat ca cac san pham lien quan , (i : k phan biet hoa thuong)

    find.title = regex  // truyen keyword la title de loc ra san pham
  }
    
  const products = await Products.find(find)
  // console.log(products)
  res.render("admin/pages/products/index",{
    pageTitle: "Danh sách sản phẩm ",
    products:products,
    fillterStatus:fillterStatus,
    keyword:keyword
  })
 }