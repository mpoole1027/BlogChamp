const mongoose = require('mongoose')

const Schema = mongoose.Schema

const commentSchema = new Schema({
  num_likes: {
    type: Number,
    required: true
  },

  date_posted: {
    type: Date,
    required: true
  },

  post_id: {
    type: Schema.Types.ObjectId, 
    ref: 'Post',
    required: true
  }

})

module.exports = mongoose.model('Comment', commentSchema)