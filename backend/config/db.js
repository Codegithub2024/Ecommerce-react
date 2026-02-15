const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connectDb = async (req, res) => {
  try {
    mongoose.connect(process.env.MONGO_URI);
    console.log("connection réussie");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

module.exports = connectDb;
