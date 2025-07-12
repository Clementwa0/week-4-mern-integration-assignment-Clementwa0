const express = require('express');
const {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} = require('../controllers/Post');
const { protect } = require('../middleware/Auth');

const router = express.Router();

// @route   GET /api/posts
router.get('/', getPosts);

// @route   GET /api/posts/:id
router.get('/:id', getPostById);

// @route   POST /api/posts
router.post('/', protect, createPost);

// @route   PUT /api/posts/:id
router.put('/:id', protect, updatePost);

// @route   DELETE /api/posts/:id
router.delete('/:id', protect, deletePost);

module.exports = router;
