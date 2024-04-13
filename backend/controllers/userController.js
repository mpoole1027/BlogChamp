const User = require('../models/userModel')
const mongoose = require('mongoose')

// get all posts
const getUsers = async (req, res) => {
  const users = await User.find({}).sort({createdAt: -1})

  res.status(200).json(users)
}


// get a single post
const getUser = async (req, res) => {
  const {id} = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such user, invalid ID format'})
  }

  const workout = await User.findById(id)

  if (!workout) {
    return res.status(404).json({error: 'No such user, user not found'})
  }

  res.status(200).json(workout)
}


// create a single post
const createUser = async (req, res) => {
  const {username, password, age, bio} = req.body
  
  // add post to db
  try {
    const user = await User.create({username, password, age, bio})
    res.status(200).json(user)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// delete a post
const deleteUser = async (req, res) => {
  const {id} = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such user, invalid ID format'})
  }

  const workout = await Post.findOneAndDelete({_id: id})

  
  if (!workout) {
    return res.status(404).json({error: 'No such user, user not found'})
  }

  res.status(200).json(workout)
}

// update a post
const updateUser = async (req, res) => {

  const {id} = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such user, invalid ID format'})
  }

  const workout = await User.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  
  if (!workout) {
    return res.status(404).json({error: 'No such user, user not found'})
  }

  res.status(200).json(workout)
}

module.exports = {
  createUser,
  getUsers,
  getUser,
  deleteUser,
  updateUser
}
