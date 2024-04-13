// placeholder, this is where you would define routes for fetching from and/or
// uploading to the database.
const express = require('express')
const {
  createUser,
  getUsers,
  getUserById,
  getUserByUsername,
  deleteUser,
  updateUser,
} = require('../controllers/userController')
const router = express.Router()

// GET all posts
router.get('/', getUsers)

// GET a single user by ID
router.get('/id/:id', getUserById)

// GET a single user by ID
router.get('/username/:username', getUserByUsername)

// POST a new post
router.post('/', createUser)

// DELETE a post
router.delete('/:id', deleteUser)

// UPDATE a post
router.patch('/:id', updateUser)

module.exports = router