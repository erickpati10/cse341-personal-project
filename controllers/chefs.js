const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  const result = await mongodb.getDb().db().collection('chefs').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('chefs').find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createChefInfo = async (req, res) => {
  const chef = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    nationality: req.body.nationality,
    specialty: req.body.specialty,
    yearsOfExperience: req.body.yearsOfExperience
  };
  const response = await mongodb.getDb().db().collection('chefs').insertOne(chef);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the chef.');
  }
};

const updateChefInfo = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const chef = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    nationality: req.body.nationality,
    specialty: req.body.specialty,
    yearsOfExperience: req.body.yearsOfExperience
  };
  const response = await mongodb.getDb().db().collection('chefs').replaceOne({ _id: userId }, chef);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the chef.');
  }
};

const deleteChefInfo = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('chefs').deleteOne({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the chef.');
  }
};

module.exports = {
  getAll,
  getSingle,
  createChefInfo,
  updateChefInfo,
  deleteChefInfo
};
