// placeholder, this is where you would define routes for fetching from and/or
// uploading to the database.
const express = require('express')
const {
  createBlog,
  getBlogs,
  getBlog,
  deleteBlog,
  updateBlog,
  getPosts,
} = require('../controllers/blogController')
const router = express.Router()

// GET all blogs
router.get('/', getBlogs)

// GET a single blog
router.get('/:id', getBlog)

// POST a new blog
router.post('/', createBlog)

// DELETE a blog
router.delete('/:id', deleteBlog)

// UPDATE a blog
router.patch('/:id', updateBlog)

// GET all posts
router.patch('/:id', getPosts)

module.exports = router
