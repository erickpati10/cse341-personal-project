const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');

const mongodb = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${connection.connection.host} on port ${process.env.PORT}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

(module.exports = mongodb), mongoose.connection;
