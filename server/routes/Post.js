const express = require('express');
const {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  addComment,
  searchPosts,
} = require('../controllers/Post');
const { protect } = require('../middleware/Auth');

const router = express.Router();

// @route   GET /api/posts
router.get('/', getPosts);

// @route   GET /api/posts/search
router.get('/search', searchPosts);

// @route   GET /api/posts/:id
router.get('/:id', getPostById);

// @route   POST /api/posts
router.post('/', protect, createPost);

// @route   PUT /api/posts/:id
router.put('/:id', protect, updatePost);

// @route   DELETE /api/posts/:id
router.delete('/:id', protect, deletePost);

// @route   POST /api/posts/:id/comments
router.post('/:id/comments', protect, addComment);

module.exports = router;
