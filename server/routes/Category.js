const express = require('express');
const {
  getCategories,
  createCategory,
} = require('../controllers/Category');
const { protect, authorize } = require('../middleware/Auth');

const router = express.Router();


router.get('/', getCategories);

router.post('/', protect, /* authorize('admin'), */ createCategory);

module.exports = router;
