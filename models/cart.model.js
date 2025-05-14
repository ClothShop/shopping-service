
const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  product_id: { type: String, required: true },
  count: { type: Number, required: true, default: 1 },
  price: { type: Number, required: true }
})

const cartSchema = new mongoose.Schema({
  user_id: { type: String, required: true, unique: true },
  products: [productSchema]
})

module.exports ={
  CartModel:mongoose.model('Cart', cartSchema)
}
