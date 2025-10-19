const Products = require("../../models/product.models")

const fillterStatusHelper = require("../../helpers/fillterStatus")
const SearchHelper = require("../../helpers/search")
const paginationHelper = require("../../helpers/pagination")

// [GET] /admin/products
module.exports.products = async (req, res) => {
  // tạo ra 1 obj có property là obj =  {products : async}
  // console.log(req.query.status) lay ra trang thai khi press vao button (active , inactive)

  //Bộ lọc
  const fillterStatus = fillterStatusHelper(req.query)


  let find = {
    // dung de loc ra cac san pham
    deleted : false,
    // title: 'iPhone 9'
    // status: active
  }
  if(req.query.status){
    find.status = req.query.status  // truyền active vào find để lọc ra sản phẩm
  }

  // Search sp
  const objSearch = SearchHelper(req.query)

  if(objSearch.regex){
    find.title = objSearch.regex
  }
  // End search

  //pagination phân trang 
  const countProducts = await Products.countDocuments(find) // total products
  let objPagination = paginationHelper(
    {
    currentPage : 1,
    itemsLimit : 4
    },
    req.query ,
    countProducts
   )
  // End pagination

  const products = await Products.find(find).limit(objPagination.itemsLimit).
  skip(objPagination.skip)
  // console.log(products)
  res.render("admin/pages/products/index",{
    pageTitle: "Danh sách sản phẩm ",
    products:products,
    fillterStatus:fillterStatus,
    keyword:objSearch.keyword,
    pagination : objPagination
  })
}

// [PATCH] /admin/products/change-status/:status/:id
module.exports.changeStatus = async (req , res) => {
  console.log(req.params)
  const status = req.params.status
  const id = req.params.id 
  

  await Products.updateOne({_id: id} , {status: status}) // update san pham dua vao id , va update field status

  res.redirect(`/admin/products`) // reload trang lai ve duong dan nay

}

// [DELETE] /admin/products/delete/:id
module.exports.deleteItem = async (req , res) => {
  const id = req.params.id 
  

  await Products.deleteOne({_id: id})

  res.redirect(`/admin/products`) // reload trang lai ve duong dan nay

}