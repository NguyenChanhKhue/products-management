const ProductCategories = require('../../models/product-categories.model')
const systemConfig = require('../../config/system')

const fillterStatusHelper = require("../../helpers/fillterStatus")
const SearchHelper = require("../../helpers/search")
const paginationHelper = require("../../helpers/pagination")
const  {createTree}  = require('../../helpers/createTree');
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

  const newRecord = createTree(productCategories, "")

  res.render("admin/pages/product-categories/index", {
    pageTitle: "Trang danh mục sản phẩm ",
    productCategories: newRecord,
    fillterStatus: fillterStatus,
    objPagination: objPagination,
    keyword:objSearch.keyword,
  })
}

// [GET] admin/products-categories/create
module.exports.create = async (req, res) => {

  const find = {
    deleted: false
  }

  // bản ghi các danh mục
  const records = await ProductCategories.find(find)

  const newRecord = createTree(records, "")

  res.render("admin/pages/product-categories/create", {
    pageTitle: "Trang tạo danh mục sản phẩm ",
    records: newRecord
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

    res.render("admin/pages/product-categories/detail",{
        pageTitle:product.title,
        product:product
    })
  } catch (error) {
    res.redirect("products")
  }
}


// [GET] /admin/products/edit/:id
module.exports.edit = async (req , res)=>{
  try{
    const find = {
      deleted:false,
      _id : req.params.id
    }
    
    const product = await ProductCategories.findOne(find)

    // danh sách các danh mục
    const records = await ProductCategories.find({
      deleted:false
    })


    const newRecord = createTree(records, "")
    console.log(newRecord)
    res.render('admin/pages/product-categories/edit',{
      pageTitle : "Trang chinh sua san pham",
      product:product,
      records:newRecord
    } )
  }catch{
    res.redirect('product-categories')
  }

}


// [PATCH] /admin/products/edit/:id
module.exports.editPatch = async (req , res)=>{
  
  req.body.position =parseInt(req.body.position)

  try {
    await ProductCategories.updateOne(
      {_id:req.params.id}, req.body) // update san pham , key la id
  } catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/product-categories/edit/${req.params.id}`)  
  }
  res.redirect(`${systemConfig.prefixAdmin}/product-categories/edit/${req.params.id}`)

}
