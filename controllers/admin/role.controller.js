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


 