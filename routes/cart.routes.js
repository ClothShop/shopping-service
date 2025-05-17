const express = require('express')
const router = express.Router()
const cartController = require('../controllers/cart.controller.js');
const {authenticateJWT} = require("../middlewares/jwt");

router.get('/me', authenticateJWT, cartController.getMyCarts);
router.post('/me/add', authenticateJWT, cartController.addProduct);
router.post('/me/:productId/increment', authenticateJWT, cartController.incrementProduct);
router.post('/me/:productId/decrement', authenticateJWT, cartController.decrementProduct)
router.delete('/me/:productId', authenticateJWT, cartController.removeProduct);

module.exports = router
