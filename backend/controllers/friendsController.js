const Friend = require('../models/friendModel')
const mongoose = require('mongoose')

// get all friends
const getFriends = async (req, res) => {
  const friends = await Friend.find({}).sort({createdAt: -1})

  res.status(200).json(friends)
}

const getFriendsByUserid = async (req, res) => {
  const {id} = req.params
  console.log(req.params)
  const friends =  await Friend.find({user_one : id})

  res.status(200).json(friends)
}


// get a single friend
const getFriend = async (req, res) => {
  const {id} = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such friend, invalid ID format'})
  }

  const workout = await Friend.findById(id)

  if (!workout) {
    return res.status(404).json({error: 'No such friend, friend not found'})
  }

  res.status(200).json(workout)
}


// create a single friend
const createFriend = async (req, res) => {
  const {user_one, user_two} = req.body
  
  // add friend to db
  try {
    const friend = await Friend.create({user_one, user_two})
    res.status(200).json(friend)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// delete a friend
const deleteFriend = async (req, res) => {
  const {id} = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such friend, invalid ID format'})
  }

  const workout = await Friend.findOneAndDelete({_id: id})

  
  if (!workout) {
    return res.status(404).json({error: 'No such friend, friend not found'})
  }

  res.status(200).json(workout)
}

// update a friend
const updateFriend = async (req, res) => {

  const {id} = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such friend, invalid ID format'})
  }

  const workout = await Friend.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  
  if (!workout) {
    return res.status(404).json({error: 'No such friend, friend not found'})
  }

  res.status(200).json(workout)
}

module.exports = {
  createFriend,
  getFriends,
  getFriend,
  deleteFriend,
  updateFriend,
  getFriendsByUserid
}
