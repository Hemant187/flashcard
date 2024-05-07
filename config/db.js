const mongoose = require('mongoose')

const connectDB = async (req,res) => {
  try {
    const connection = await mongoose.connect(process.env.DB_STRING)
    console.log('MongoDb database connected!')
  } catch (err) {
    console.error(err);
  }
}

module.exports = connectDB
