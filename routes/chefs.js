const express = require('express');
const router = express.Router();

const chefsController = require('../controllers/chefs');

router.get('/', chefsController.getAll);

router.get('/:id', chefsController.getSingle);

router.post('/', chefsController.createchef);

router.put('/:id', chefsController.updatechef);

router.delete('/:id', chefsController.deletechef);

module.exports = router;
