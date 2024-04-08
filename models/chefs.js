const mongoose = require('mongoose');

const chefSchema = new mongoose.Schema({
  chef_id: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  nationality: { type: String, required: true },
  specialty: { type: String, required: true },
  yearsOfExperience: { type: String, required: true }
});

const Chefs = mongoose.model('chefs', chefSchema);

module.exports = Chefs;


