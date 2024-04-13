// placeholder, this is where you would define routes for fetching from and/or
// uploading to the database.
const express = require('express')
const {
  createPost,
  getPosts,
  getPost,
  deletePost,
  updatePost,
  getPostsByUserID,
} = require('../controllers/postController')
const router = express.Router()

// GET all posts
router.get('/', getPosts)

// GET a single post
router.get('/id/:id', getPost)

// POST a new post
router.post('/', createPost)

// DELETE a post
router.delete('/:id', deletePost)

// UPDATE a post
router.patch('/:id', updatePost)

// GET all posts by a user
router.get('/user_id/:id', getPostsByUserID )

module.exports = router
