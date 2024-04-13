const express = require('express');
const router = express.Router();
const {
  createBlog,
  getBlogs,
  getBlog,
  deleteBlog,
  updateBlog,
  getPosts
} = require('../controllers/blogController'); // Import controllers

// GET all blogs
router.get('/', getBlogs);

// GET a single blog
router.get('/:id', getBlog);

// POST a new blog
router.post('/', createBlog);

// DELETE a blog
router.delete('/:id', deleteBlog);

// UPDATE a blog
router.patch('/:id', updateBlog);

// GET all posts
router.get('/:id/posts', getPosts);

module.exports = router;
