const Products = require("../../models/product.models")

// [GET] /admin/products
module.exports.products = async (req, res) => {
  // console.log(req.query.status) lay ra trang thai khi press vao button (active , inactive)

  // lưu các trạng thái button để render ra giao diện
  let fillterStatus = [
    {
      name: "Tất cả",
      status: "",
      class: "",
    },
    {
      name: "Hoạt động",
      status: "active",
      class: "",
    },
    {
      name: "Dừng hoạt động",
      status: "inactive",
      class: "",
    }
  ]

  // xử lý hiển thị màu cho button khi ấn vào
  if (req.query.status){
    const index = fillterStatus.findIndex(item => item.status == req.query.status); // tìm ra nút có status == status truyền vào url (khi ấn button)
    fillterStatus[index].class = "active"; // truyền active cho class đó
  }else{
    const index = fillterStatus.findIndex(item => item.status == ""); // button "tất cả"
    fillterStatus[index].class = "active";
  }


  let find = {
    // dung de loc ra cac san pham
    deleted : false
    // status: active
  }
  if(req.query.status){
    find.status = req.query.status  // truyền active vào find để lọc ra sản phẩm
  }
    
  const products = await Products.find(find)
  // console.log(products)
  res.render("admin/pages/products/index",{
    pageTitle: "Danh sách sản phẩm ",
    products:products,
    fillterStatus:fillterStatus
  })
 }