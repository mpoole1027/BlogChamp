const mongoose = require('mongoose')

const Schema = mongoose.Schema

const blogSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  title: {
    type: String,
    required: true
  },

  contents: {
    type: String,
    required: true
  },

  creation_date: {
    type: Date,
    required: true
  }
})

module.exports = mongoose.model('Blog', blogSchema)
