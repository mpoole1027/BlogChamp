const express = require('express');
const router = express.Router();
const {
  createBlog,
  getBlogs,
  getBlogById,
  getBlogByUserId,
  deleteBlog,
  updateBlog,
  getPosts
} = require('../controllers/blogController'); // Import controllers

// GET all blogs
router.get('/', getBlogs);

// GET a single blog by id
router.get('/id/:id', getBlogById);

// GET a single blog by user id
router.get('/userid/:id', getBlogByUserId);

// POST a new blog
router.post('/', createBlog);

// DELETE a blog
router.delete('/:id', deleteBlog);

// UPDATE a blog
router.patch('/:id', updateBlog);

module.exports = router;
