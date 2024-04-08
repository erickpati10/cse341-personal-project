const mongodb = require('../config/db/connect');
const ObjectId = require('mongodb').ObjectId;
const Recipe = require('../models/recipes');

const getAll = async (req, res) => {
  try {
    const allRecipes = await Recipe.find();
    res.status(200).json(allRecipes);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getSingleRecipe = async (req, res) => {
  if (!ObjectId.isValid(req.params.recipe_id)) {
    return res.status(400).json('Invalid ID');
  }

  const recipeId = new ObjectId(req.params.recipe_id);

  try {
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }
    res.status(200).json(recipe);
  } catch (error) {
    console.error('Error fetching recipe by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createRecipeInfo = async (req, res) => {
  try {
    const { recipe_id, title, ingredients, instruction, cuisine, category, equipment, cookTime, servings } = req.body;
    const recipe = new Recipe({
      _id: recipe_id,
      title,
      ingredients,
      instruction,
      cuisine,
      category,
      equipment,
      cookTime,
      servings
    });

    const insertedRecipe = await recipe.save();
    res.status(201).json(insertedRecipe._id);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateRecipeInfo = async (req, res) => {
  if (!ObjectId.isValid(req.params.recipe_id)) {
    return res.status(400).json('Invalid ID');
  }

  const recipeId = new ObjectId(req.params.recipe_id);

  try {
    const { title, ingredients, instruction, cuisine, category, equipment, cookTime, servings } = req.body;

    const updatedRecipe = await Recipe.findByIdAndUpdate(recipeId, {
      title,
      ingredients,
      instruction,
      cuisine,
      category,
      equipment,
      cookTime,
      servings
    }, { new: true });

    if (!updatedRecipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    res.sendStatus(204);
  } catch (error) {
    console.error('Error updating recipe:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteRecipeInfo = async (req, res) => {
  if (!ObjectId.isValid(req.params.recipe_id)) {
    return res.status(400).json('Invalid ID');
  }

  const recipeId = new ObjectId(req.params.recipe_id);

  try {
    await Recipe.deleteOne({ _id: recipeId });
    res.sendStatus(200);
  } catch (error) {
    console.error('Error deleting recipe:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAll,
  getSingleRecipe,
  createRecipeInfo,
  updateRecipeInfo,
  deleteRecipeInfo
};
