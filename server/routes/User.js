const express = require('express');
const { register, login } = require('../controllers/Auth');
const { protect } = require('../middleware/Auth');

const router = express.Router();

// @route   POST /api/auth/register
router.post('/register', register);

// @route   POST /api/auth/login
router.post('/login', login);

// @route   GET /api/auth/me
// @desc    Get logged-in user (JWT or Clerk)
router.get('/me', protect, async (req, res) => {
  res.status(200).json(req.user);
});

module.exports = router;
