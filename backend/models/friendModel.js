const mongoose = require('mongoose')

const Schema = mongoose.Schema

const friendSchema = new Schema({
  user_one: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  user_two: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
})

module.exports = mongoose.model('Friend', friendSchema)

