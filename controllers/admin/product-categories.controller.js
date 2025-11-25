const ProductCategories = require('../../models/product-categories.model')
const systemConfig = require('../../config/system')

const fillterStatusHelper = require("../../helpers/fillterStatus")
const SearchHelper = require("../../helpers/search")
const paginationHelper = require("../../helpers/pagination")
// [GET] admin/products-categories
module.exports.productCategories = async (req, res) => {

  const fillterStatus = fillterStatusHelper(req.query)  // Lọc


  let find = {
    // dung de loc ra cac san pham
    deleted: false,
  }
  if (req.query.status) {
    find.status = req.query.status  // truyền active vào find để lọc ra sản phẩm
  }

  // Search sp
  const objSearch = SearchHelper(req.query)

  if (objSearch.regex) {
    find.title = objSearch.regex
  }
  // End search

  //pagination phân trang 
  const countProducts = await ProductCategories.countDocuments(find) // total products
  let objPagination = paginationHelper(
    {
      currentPage: 1,
      itemsLimit: 4
    },
    req.query,
    countProducts
  )
  // End pagination


  // Sort
  let sort = {}


  if (req.query.sortKey && req.query.sortValue) {
    sort[req.query.sortKey] = req.query.sortValue // truyen string , sort[] = sort.price , sort.position ,....
  } else {
    sort.position = "desc" // mac dinh giam gian
  }

  // End Sort
  const productCategories = await ProductCategories.find(find)

  res.render("admin/pages/product-categories/index", {
    pageTitle: "Trang danh mục sản phẩm ",
    productCategories: productCategories,
    fillterStatus: fillterStatus,
    objPagination: objPagination,
    keyword:objSearch.keyword,
  })
}

// [GET] admin/products-categories/create
module.exports.create = async (req, res) => {
  res.render("admin/pages/product-categories/create", {
    pageTitle: "Trang tạo danh mục sản phẩm "
  })
}

// [POST] /admin/product-categories/createProducts
module.exports.createProducts = async (req, res) => {

  if (req.body.position == "") {
    const countProduct = await ProductCategories.countDocuments()
    req.body.position = countProduct + 1
  } else {
    req.body.position = parseInt(req.body.position)
  }

  const record = new ProductCategories(req.body)
  await record.save()

  res.redirect(`${systemConfig.prefixAdmin}/product-categories`)

}

// [GET] /admin/products/detail/:id
module.exports.detail = async (req , res ) => {
  try {
    const find = {
    deleted: false ,
    _id: req.params.id,
  }

    const product = await ProductCategories.findOne(find);

    console.log(product)

    res.render("admin/pages/product-categories/detail",{
        pageTitle:product.title,
        product:product
    })
  } catch (error) {
    res.redirect("products")
  }
}
