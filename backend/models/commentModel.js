const mongoose = require('mongoose')

const Schema = mongoose.Schema

const commentSchema = new Schema({

  date_posted: {
    type: Date,
    required: true
  },

  post_id: {
    type: Schema.Types.ObjectId, 
    ref: 'Post',
    required: true
  },

  content: {
    type: String,
    required: true
  },

  user_id: {
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true
  }

})

module.exports = mongoose.model('Comment', commentSchema)