const axios = require('axios')
const { CartModel } = require('../models/cart.model')

const getCartByUserId = async (user_id) => {
  const cart = await CartModel.findOne({ user_id: String(user_id) })
  if (!cart) return null;

  const cart_items = await Promise.all(
    cart.products.map(async (item) => {
      const response = await axios.get(`http://localhost:8888/api/v1/products/${item.product_id}`).catch(() => null)
      return response && response.data ? {
        product: response.data,
        quantity: item.quantity,
      } : null
    })
  )

  return cart_items.filter(p => p !== null)
}

const addOrIncrementProduct = async (user_id, product) => {
  const response = await axios.get(`http://localhost:8888/api/v1/products/${product.product_id}`).catch(() => null)
  if (!response || !response.data) throw new Error('Product not found')

  const userIdStr = String(user_id)
  const cart = await CartModel.findOne({ user_id: userIdStr })

  if (cart) {
    const existingProduct = cart.products.find(p => p.product_id === product.product_id)
    if (existingProduct) {
      existingProduct.quantity += product.quantity
    } else {
      cart.products.push({ ...product, quantity: product.quantity })
    }
    await cart.save()
    return await getCartByUserId(user_id)
  } else {
    await CartModel.create({ user_id: userIdStr, products: [{ ...product, quality: 1 }] })
    return await getCartByUserId(user_id)
  }
}

const decrementProduct = async (user_id, product_id) => {
  const response = await axios.get(`http://localhost:8888/api/v1/products/${product_id}`).catch(() => null)
  if (!response || !response.data) throw new Error('Product not found')

  const userIdStr = String(user_id)
  const cart = await CartModel.findOne({ user_id: userIdStr })
  if (!cart) return null

  const product = cart.products.find(p => p.product_id === Number.parseInt(product_id))
  if (product) {
    if (product.quantity > 1) {
      product.quantity -= 1
      await cart.save()
      return await getCartByUserId(user_id)
    } else {
      await removeProduct(userIdStr, product_id)
      return {success: true}
    }
  } else {
    throw new Error('Product not found from cart')
  }
}

const removeProduct = async (user_id, product_id) => {
  const response = await axios.get(`http://localhost:8888/api/v1/products/${product_id}`).catch(() => null)
  if (!response || !response.data) throw new Error('Product not found')

  await CartModel.updateOne(
      { user_id: String(user_id) },
      { $pull: { products: { product_id } } }
  )
  return await getCartByUserId(user_id)
}

const removeCart = async (user_id) => {
  return CartModel.deleteOne({ user_id: String(user_id) });
}

module.exports = {
  getCartByUserId,
  addOrIncrementProduct,
  removeProduct,
  decrementProduct,
  removeCart,
}
