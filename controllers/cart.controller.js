const cartService = require("../services/cart_services");

exports.getMyCarts = async function (req, res) {
    try {
        const cart = await cartService.getCartByUserId(String(req.user.UserID))
        if (!cart) {
            return res.json([])
        }
        res.json(cart)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.addProduct = async (req, res) => {
    try {
        const result = await cartService.addOrIncrementProduct(req.user.UserID, req.body)
        res.json(result)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.decrementProduct = async (req, res) => {
    try {
        const result = await cartService.decrementProduct(String(req.user.UserID), req.params.productId)
        res.json(result)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.removeProduct = async (req, res) => {
    try {
        const result = await cartService.removeProduct(String(req.user.UserID), req.params.productId)
        res.json(result)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.removeCart = async (req, res) => {
    try {
        await cartService.removeCart(String(req.user.UserID))
        res.json({success: true})
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}