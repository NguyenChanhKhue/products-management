const mongoose = require("mongoose")


const roleSchema = new mongoose.Schema({
  title: String,
  
  description: String,
  permission:{
    type: Array,
    default:[]
  },
  deleted: {
    type: Boolean,
    default: false
  },
  deletedAt: Date
},
{
  timestamps: true // (createdAt , updatedAt)
}
)

// (name_model , name_schema , name_collection)

const Role = mongoose.model("Role", roleSchema, "roles")

module.exports = Role