const mongoose = require("mongoose")

// slug
slug = require('mongoose-slug-updater')
mongoose.plugin(slug)


const productCategorySchema = new mongoose.Schema({
  title: String,
  parent_id:{
    type: String,
    default:""
  },
  description: String,
  thumbnail: String,
  status: String,
  position: Number,
  slug:{
    type: String,
    slug: "title",
    unique: true
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

const productCategories = mongoose.model("ProductCategories", productCategorySchema, "product-categories")

module.exports = productCategories