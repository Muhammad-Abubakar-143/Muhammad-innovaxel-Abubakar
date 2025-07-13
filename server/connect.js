require('dotenv').config();
const mongoose = require('mongoose');


const connectMongo = async () => {
  const uri = process.env.MONGODB_URL;
  if (!uri) throw new Error('MONGODB_URL not defined in .env');

  await mongoose.connect(uri);
};

module.exports = connectMongo;
