const mongoose = require("mongoose")

// slug
slug = require('mongoose-slug-updater')
mongoose.plugin(slug)


const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  discountPercentage: Number,
  stock: Number,
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

const Product = mongoose.model("Product", productSchema, "products")

module.exports = Product