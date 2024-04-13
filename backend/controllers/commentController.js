const Comment = require('../models/commentModel')
const mongoose = require('mongoose')

// get all posts
const getComments = async (req, res) => {
  const comments = await Comment.find({}).sort({createdAt: -1})

  res.status(200).json(comments)
}


// get a single post
const getComment = async (req, res) => {
  const {id} = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such comment, invalid ID format'})
  }

  const workout = await Comment.findById(id)

  if (!workout) {
    return res.status(404).json({error: 'No such comment, comment not found'})
  }

  res.status(200).json(workout)
}


// create a single post
const createComment = async (req, res) => {
  const {num_likes, date_posted, post_id} = req.body
  
  // add post to db
  try {
    const comment = await Comment.create({num_likes, date_posted, post_id})
    res.status(200).json(comment)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// delete a post
const deleteComment = async (req, res) => {
  const {id} = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such comment, invalid ID format'})
  }

  const workout = await Comment.findOneAndDelete({_id: id})

  
  if (!workout) {
    return res.status(404).json({error: 'No such comment, comment not found'})
  }

  res.status(200).json(workout)
}

// update a post
const updateComment = async (req, res) => {

  const {id} = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such comment, invalid ID format'})
  }

  const workout = await Comment.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  
  if (!workout) {
    return res.status(404).json({error: 'No such comment, comment not found'})
  }

  res.status(200).json(workout)
}

module.exports = {
  createComment,
  getComments,
  getComment,
  deleteComment,
  updateComment
}
