const mongoose = require('mongoose')

const Schema = mongoose.Schema

const friendSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  friend_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
})

module.exports = mongoose.model('Friend', friendSchema)

