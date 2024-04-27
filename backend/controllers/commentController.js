const Comment = require('../models/commentModel')
const mongoose = require('mongoose')

// get all comments
const getComments = async (req, res) => {
  const { post_id } = req.params;

  try {
    // Fetch comments only for the specified post_id
    const comments = await Comment.find({ post_id });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching comments', error: error.message });
  }
};


// get a single comment
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


// create a single comment
const createComment = async (req, res) => {
  const {date_posted, post_id, content, user_id} = req.body
  
  // add post to db
  try {
    const comment = await Comment.create({date_posted, post_id, content, user_id})
    res.status(200).json(comment)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// delete a comment
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

// update a comment
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
