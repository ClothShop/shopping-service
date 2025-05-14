const { CartModel } = require('../models/cart.model')

const getCartByUserId = async (user_id) => {
  const cart = await CartModel.findOne({ user_id: String(user_id) })
  if (!cart) return null;

  // ➕ Жалпы бағасын есептеу
  const total_price = cart.products.reduce((sum, product) => {
    return sum + product.count * product.price;
  }, 0)

  // 👇 total_price бірге қайтарамыз
  return {
    ...cart.toObject(), // cart-ты объектке айналдырамыз
    total_price
  }
}


const addOrIncrementProduct = async (user_id, product) => {
  const userIdStr = String(user_id)
  const cart = await CartModel.findOne({ user_id: userIdStr })

  if (cart) {
    const existingProduct = cart.products.find(p => p.product_id === product.product_id)
    if (existingProduct) {
      existingProduct.count += 1
    } else {
      cart.products.push({ ...product, count: 1 })
    }
    return await cart.save()
  } else {
    return await CartModel.create({ user_id: userIdStr, products: [{ ...product, count: 1 }] })
  }
}

const removeProduct = async (user_id, product_id) => {
  return await CartModel.updateOne(
    { user_id: String(user_id) },
    { $pull: { products: { product_id } } }
  )
}

const incrementProduct = async (user_id, product_id) => {
  return await CartModel.updateOne(
    { user_id: String(user_id), 'products.product_id': product_id },
    { $inc: { 'products.$.count': 1 } }
  )
}

const decrementProduct = async (user_id, product_id) => {
  const userIdStr = String(user_id)
  const cart = await CartModel.findOne({ user_id: userIdStr })
  if (!cart) return null

  const product = cart.products.find(p => p.product_id === product_id)
  if (product) {
    if (product.count > 1) {
      product.count -= 1
      return await cart.save()
    } else {
      return await removeProduct(userIdStr, product_id)
    }
  }
}

module.exports = {
  getCartByUserId,
  addOrIncrementProduct,
  removeProduct,
  incrementProduct,
  decrementProduct
}
