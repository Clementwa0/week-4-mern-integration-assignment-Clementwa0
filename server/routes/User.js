const express = require('express');
const {
  register,
  login,
} = require('../controllers/Auth');
const { protect } = require('../middleware/Auth');

const router = express.Router();


router.post('/register', register);


router.post('/login', login);

router.get('/me', protect, async (req, res) => {
  res.status(200).json(req.user);
});

module.exports = router;
