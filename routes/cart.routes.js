const express = require('express')
const router = express.Router()
const cartController = require('../controllers/cart.controller.js');
const {authenticateJWT} = require("../middlewares/jwt");

router.get('/me', authenticateJWT, cartController.getMyCarts);
router.post('/me/add', authenticateJWT, cartController.addProduct);
router.delete('/me/:productId/decrement', authenticateJWT, cartController.decrementProduct)
router.delete('/me/:productId', authenticateJWT, cartController.removeProduct);
router.delete('/me', authenticateJWT, cartController.removeCart);

module.exports = router
