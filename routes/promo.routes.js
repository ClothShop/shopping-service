const express = require('express');
const router = express.Router();
const controller = require('../controllers/promo.controller');
const {authenticateJWT, authorizeAdmin} = require("../middlewares/jwt");
const {validateBody} = require("../middlewares/validateBody");
const {promoCodeSchema, updatePromoCodeSchema} = require("../dto/promo.dto");

router.post('/', authenticateJWT, authorizeAdmin, validateBody(promoCodeSchema), controller.create);
router.get('/', authenticateJWT, authorizeAdmin, controller.getAll);
router.get('/code/:code', controller.getByCode);
router.get('/:id', controller.getOne);
router.put('/:id', authenticateJWT, authorizeAdmin, validateBody(updatePromoCodeSchema), controller.update);
router.delete('/code/:code', authenticateJWT, authorizeAdmin, controller.removeByCode);
router.delete('/:id', authenticateJWT, authorizeAdmin, controller.remove);

module.exports = router;
