const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  recipe_id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  ingredients: { type: String, required: true },
  instruction: { type: String, required: true },
  cuisine: { type: String, required: true },
  category: { type: String, required: true },
  equipment: { type: String, required: true },
  cookTime: { type: String, required: true },
  servings: { type: String, required: true }
});

const Recipes = mongoose.model('recipes', recipeSchema);

module.exports = Recipes;
