const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a category name'],
      unique: true,
      trim: true,
      maxlength: [50, 'Category name must be under 50 characters'],
    },
    description: {
      type: String,
      maxlength: [200, 'Description can be max 200 characters'],
      default: '',
    },
    slug: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook to generate slug from name
categorySchema.pre('save', function (next) {
  if (!this.isModified('name')) return next();

  this.slug = this.name
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');

  next();
});

// Virtual for frontend use (e.g., linking to categories/:slug)
categorySchema.virtual('url').get(function () {
  return `/categories/${this.slug}`;
});

module.exports = mongoose.model('Category', categorySchema);
