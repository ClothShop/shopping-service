const express = require('express')
const router = express.Router()
const cartService = require('../services/cart_services')
const { CartModel } = require('../models/cart.model')

// 🛒 1. Жаңа корзина жасау
router.post('/', async (req, res) => {
  try {
    const newCart = await CartModel.create(req.body)
    res.status(201).json(newCart)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// 🛒 2. Қолданушы ID бойынша корзинаны алу
router.get('/:userId', async (req, res) => {
  try {
    const cart = await cartService.getCartByUserId(String(req.params.userId))
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' })
    }
    res.json(cart)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// ➕ 3. Өнімді қосу немесе санын арттыру
router.post('/:userId/add', async (req, res) => {
  try {
    const result = await cartService.addOrIncrementProduct(String(req.params.userId), req.body)
    res.json(result)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// ❌ 4. Өнімді өшіру
router.delete('/:userId/:productId', async (req, res) => {
  try {
    const result = await cartService.removeProduct(String(req.params.userId), req.params.productId)
    res.json(result)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// 🔼 5. Өнім санын арттыру
router.post('/:userId/:productId/increment', async (req, res) => {
  try {
    const result = await cartService.incrementProduct(String(req.params.userId), req.params.productId)
    res.json(result)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// 🔽 6. Өнім санын азайту
router.post('/:userId/:productId/decrement', async (req, res) => {
  try {
    const result = await cartService.decrementProduct(String(req.params.userId), req.params.productId)
    res.json(result)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router
