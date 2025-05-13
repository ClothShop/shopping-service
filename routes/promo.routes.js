const express = require('express');
const router = express.Router();
const controller = require('../controllers/promo.controller');

router.post('/', controller.create);
router.get('/', controller.getAll);
router.get('/code/:code', controller.getByCode);
router.get('/:id', controller.getOne);
router.put('/:id', controller.update);
router.delete('/code/:code', controller.removeByCode);
router.delete('/:id', controller.remove);

module.exports = router;
