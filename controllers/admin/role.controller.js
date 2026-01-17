const Role = require('../../models/roles.model')
const systemConfig = require("../../config/system")


// [GET] /admin/roles
module.exports.roles =  async (req, res) =>{

  let find = {
    deleted : false
  }

  const records = await Role.find(find)

  res.render("admin/pages/role/index",{
    pageTitle: "Trang nhóm quyền",
    records:records
    }
  )
}

// [GET] /admin/create
module.exports.create =  async (req, res) =>{

  let find = {
    deleted : false
  }

  const records = await Role.find(find)

  res.render("admin/pages/role/create",{
    pageTitle: "Trang tạo nhóm quyền",
    records:records
    }
  )
}

// [POST] /admin/create
module.exports.createPost =  async (req, res) =>{
  const records = new Role(req.body)

  await records.save()

  res.redirect(`${systemConfig.prefixAdmin}/roles`)
}


// [GET] /admin/roles/detail/:id
module.exports.detail = async (req , res ) => {
  try {
    const find = {
    deleted: false ,
    _id: req.params.id,
  }

    const role = await Role.findOne(find);

    console.log(role)

    res.render("admin/pages/role/detail",{
        pageTitle:"Trang chi tiết nhóm quyền",
        role:role
    })
  } catch (error) {
    res.redirect("roles")
  }
}

// [GET] /admin/roles/edit/:id
module.exports.edit = async (req , res) =>{
  const find = {
    deleted: false ,
    _id: req.params.id,
  }

  const role = await Role.findOne(find);

  //console.log(role)
  res.render("admin/pages/role/edit" , {
    pageTitle : "Trang chỉnh sửa nhóm quyền",
    role : role
  })
}

// [PATCH] /admin/roles/edit/:id
module.exports.editPatch = async (req , res) =>{
  try{
    await Role.updateOne(
      {_id:req.params.id},req.body
    )
  }catch(error){
    res.redirect(`${systemConfig.prefixAdmin}/roles/edit/${req.params.id}`)
  }
  res.redirect(`${systemConfig.prefixAdmin}/roles`)
}


 