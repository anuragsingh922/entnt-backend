const mongoose = require('mongoose');
const {database_uri} = require("../config.js")

const connectDB = async () => {
  try {
    await mongoose.connect(database_uri);
    console.log('MongoDB Connected');
  } catch (err) {
    console.error('MongoDB Connection Error:', err.message);
  }
};

module.exports = connectDB;