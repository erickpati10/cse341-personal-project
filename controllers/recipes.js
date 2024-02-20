const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  const result = await mongodb.getDb().db().collection('recipes').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('recipes').find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createRecipe = async (req, res) => {
  const recipe = {
    title: req.body.title,
    ingredients: req.body.ingredients,
    instructruction: req.body.instructruction,
    cuisine: req.body.cuisine,
    category: req.body.category,
    equipment: req.body.equipment,
    cookTime: req.body.cookTime,
    servings: req.body.servings
  };
  const response = await mongodb.getDb().db().collection('recipes').insertOne(recipe);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the recipe.');
  }
};

const updateRecipe = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const recipe = {
    title: req.body.title,
    ingredients: req.body.ingredients,
    instructruction: req.body.instructruction,
    cuisine: req.body.cuisine,
    category: req.body.category,
    equipment: req.body.equipment,
    cookTime: req.body.cookTime,
    servings: req.body.servings
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection('recipes')
    .replaceOne({ _id: userId }, recipe);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the recipe.');
  }
};

const deleteRecipe = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDb()
    .db()
    .collection('recipes')
    .deleteOne({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the recipe.');
  }
};

module.exports = {
  getAll,
  getSingle,
  createRecipe,
  updateRecipe,
  deleteRecipe
};
