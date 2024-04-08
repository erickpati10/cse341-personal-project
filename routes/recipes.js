const express = require('express');
const router = express.Router();

const recipesController = require('../controllers/recipes');

router.get('/', recipesController.getAll);

router.get('/:id', recipesController.getSingleRecipe);

router.post('/', recipesController.createRecipeInfo);

router.put('/:id', recipesController.updateRecipeInfo);

router.delete('/:id', recipesController.deleteRecipeInfo);

module.exports = router;


