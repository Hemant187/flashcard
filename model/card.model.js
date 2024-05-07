
const mongoose = require('mongoose')

const cardSchema = new mongoose.Schema(
  {
    front: {
      type: String,
      require: [true, 'Please fill front card']
    },
    back:{
      type: String,
      require: [true, 'Please fill back card']
    },
    score:{
      type: Number,
      default: 0
    },
    userId:{
      type: String,
      require:true
    },
    tag: {
      type: String,
      require: false
    }
  },
  {
    timestamps: true,
  }
)

const Cards = mongoose.model('Cards', cardSchema)
module.exports = Cards