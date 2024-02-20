const express = require('express');
const router = express.Router();

const chefsController = require('../controllers/chefs');

router.get('/', chefsController.getAll);

router.get('/:id', chefsController.getSingle);

router.post('/', chefsController.createChefInfo);

router.put('/:id', chefsController.updateChefInfo);

router.delete('/:id', chefsController.deleteChefInfo);

module.exports = router;
