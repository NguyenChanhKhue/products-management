const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  discountPercentage: Number,
  stock: Number,
  thumbnail: String,
  status: String,
  position: Number,
  deleted: Boolean
})

// (name_model , name_schema , name_collection)

const Product = mongoose.model("Product", productSchema, "products")

module.exports = Product