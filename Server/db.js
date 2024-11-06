const mongoose = require ('mongoose'); // to connet nodejs backend to mongodb
require('dotenv').config();
const dbURI = process.env.DATABASE_URL;
const mongoURI = process.env.DATABASE_URL //connection string from mongoDB
async function connectToMongo() {
    try {
      await mongoose.connect(mongoURI);
      console.log('Connected to MongoDB');
    } catch (err) {
      console.error('Failed to connect to MongoDB', err);
    }
  }
module.exports = connectToMongo; //exporting the connection function to be used in index.js