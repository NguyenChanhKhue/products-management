const Products = require("../../models/product.models")

const fillterStatusHelper = require("../../helpers/fillterStatus")
const SearchHelper = require("../../helpers/search")

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
  let objPagination = {
    currentPage : 1,
    itemsLimit : 4
  }

  if(req.query.page){
    objPagination.currentPage = parseInt(req.query.page)
  }
  objPagination.skip = (objPagination.currentPage - 1) * objPagination.itemsLimit
  
  const countProducts = await Products.countDocuments(find) // total products


  const totalPage = Math.ceil(countProducts / objPagination.itemsLimit)
  objPagination.totalPages = totalPage
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