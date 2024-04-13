// placeholder, this is where you would define routes for fetching from and/or
// uploading to the database.
const express = require('express')
const {
  createFriend,
  getFriends,
  getFriend,
  deleteFriend,
  updateFriend
} = require('../controllers/friendsController')
const router = express.Router()

// GET all friends
router.get('/', getFriends)

// GET a single post
router.get('/:id', getFriend)

// POST a new friend
router.post('/', createFriend)

// DELETE a friend
router.delete('/:id', deleteFriend)

// UPDATE a friend
router.patch('/:id', updateFriend)

module.exports = router