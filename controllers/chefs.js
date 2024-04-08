const mongodb = require('../config/db/connect');
const ObjectId = require('mongodb').ObjectId;
const chefs = require('../models/chefs');

const getAll = async (req, res) => {
  try {
    const allChefs = await chefs.find();
    res.status(200).json(allChefs);
  } catch (error) {
    console.error('Error fetching vailabilities:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getSingleChef = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json('Invalid ID');
  }

  const chefId = new ObjectId(req.params.id);

  try {
    const chef = await Chef.findById(chefId);
    if (!chef) {
      return res.status(404).json({ error: 'Chef not found' });
    }
    res.status(200).json(chef);
  } catch (error) {
    console.error('Error fetching chef by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


  const createChefInfo = async (req, res) => {
    try {
      const { chef_id, firstName, lastName, nationality, specialty, yearsOfExperience } = req.body;
      const chef = new Chef({
        _id: chef_id,
        firstName,
        lastName,
        nationality,
        specialty,
        yearsOfExperience
      });
  
      const insertedChef = await chef.save();
      res.status(201).json(insertedChef._id);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const updateChefInfo = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json('Invalid ID');
    }
  
    const chefId = new ObjectId(req.params.id);
  
    try {
      const { firstName, lastName, nationality, specialty, yearsOfExperience } = req.body;
  
      const updatedChef = await Chef.findByIdAndUpdate(chefId, {
        firstName,
        lastName,
        nationality,
        specialty,
        yearsOfExperience
      }, { new: true });
  
      if (!updatedChef) {
        return res.status(404).json({ error: 'Chef not found' });
      }
  
      res.sendStatus(204);
    } catch (error) {
      console.error('Error updating chef:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  const deleteChefInfo = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json('Invalid ID');
    }
  
    const chefId = new ObjectId(req.params.id);
  
    try {
      await Chef.deleteOne({ _id: chefId });
      res.sendStatus(200);
    } catch (error) {
      console.error('Error deleting chef:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  

module.exports = {
  getAll,
  getSingleChef,
  createChefInfo,
  updateChefInfo,
  deleteChefInfo
};
