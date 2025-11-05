const Products = require("../../models/product.models")

const systemConfig = require("../../config/system")

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

  // await Products.deleteOne({_id: id})  Xoá cứng 1 sản phầm , xoá thẳng trong db
 

  // xoa mem , chi xoa ngoai front end
  await Products.updateOne(
    {_id:id},
    {
      deleted: true,
      deletedAt: new Date()
    }
  )

  res.redirect(`/admin/products`) // reload trang lai ve duong dan nay

}

// [GET] /admin/products/create
module.exports.create = async (req , res ) => {
  res.render("admin/pages/products/create",{
      pageTitle: "Trang tạo sản phẩm "
  })
}


// [POST] /admin/products/create
module.exports.createProducts = async (req , res ) => {

  req.body.price = parseInt(req.body.price)
  req.body.discountPercentage = parseInt(req.body.discountPercentage)
  req.body.stock = parseInt(req.body.stock)

  if(req.body.position == ""){
    const countProduct = await Products.countDocuments()
    req.body.position = countProduct + 1
  }else{
    req.body.position = parseInt(req.body.position)
  }

  // check xem có up ảnh không , có mới lưu vào , nếu không check sẽ bị lỗi
  if(req.file){
    req.body.thumbnail = `/uploads/${req.file.filename}` // luu anh vao field thumbnail trong database
  }
  // Tạo mới 1 sản  phẩm , truyền params vào cho database đó 
  const product = new Products(req.body)
  await product.save()

  res.redirect(`${systemConfig.prefixAdmin}/products`)
}

// [GET] /admin/products/edit/:id
module.exports.edit = async (req , res ) => {
  try {
    const find = {
    deleted: false ,
    _id: req.params.id,
  }

    const product = await Products.findOne(find);

    res.render("admin/pages/products/edit",{
        pageTitle: "trang sửa sản phẩm ",
        product:product
    })
  } catch (error) {
    res.redirect("products")
  }
}

// [PATCH] /admin/products/edit/:id
module.exports.editPatch = async (req , res ) => {
  req.body.price = parseInt(req.body.price)
  req.body.discountPercentage = parseInt(req.body.discountPercentage)
  req.body.stock = parseInt(req.body.stock)
  req.body.position =parseInt(req.body.position)


  // check xem có up ảnh không , có mới lưu vào , nếu không check sẽ bị lỗi
  if(req.file){
    req.body.thumbnail = `/uploads/${req.file.filename}` // luu anh vao field thumbnail trong database
  }
  
  try {
    await Products.updateOne(
      {_id:req.params.id}, req.body) // update san pham , key la id
  } catch (error) {
    
  }

  res.redirect(`${systemConfig.prefixAdmin}/products/edit/${req.params.id}`)
}

// [GET] /admin/products/detail/:id
module.exports.detail = async (req , res ) => {
  try {
    const find = {
    deleted: false ,
    _id: req.params.id,
  }

    const product = await Products.findOne(find);

    console.log(product)

    res.render("admin/pages/products/detail",{
        pageTitle:product.title,
        product:product
    })
  } catch (error) {
    res.redirect("products")
  }
}