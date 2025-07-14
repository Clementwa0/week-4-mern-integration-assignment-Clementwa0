const Post = require('../models/Post');

// @desc    Get all posts
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('author category', 'username name');
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch posts' });
  }
};

// @desc    Get single post
exports.getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    let post;

    // Check if id is a valid ObjectId
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      post = await Post.findById(id).populate('author category');
    } else {
      // If not ObjectId, treat as slug
      post = await Post.findOne({ slug: id }).populate('author category');
    }

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Increment view count
    await post.incrementViewCount();

    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch post' });
  }
};

// @desc    Create new post
exports.createPost = async (req, res) => {
  try {
    const post = new Post({ ...req.body, author: req.user.id });
    const savedPost = await post.save();
    const populatedPost = await Post.findById(savedPost._id).populate('author category');
    res.status(201).json(populatedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @desc    Update post
exports.updatePost = async (req, res) => {
  try {
    const updated = await Post.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    ).populate('author category');
    
    if (!updated) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @desc    Delete post
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(204).end();
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @desc    Add comment to post
exports.addComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const comment = {
      user: req.user.id,
      content: req.body.content
    };

    post.comments.push(comment);
    await post.save();

    const updatedPost = await Post.findById(req.params.id).populate('author category comments.user');
    res.status(201).json(updatedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @desc    Search posts
exports.searchPosts = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({ message: 'Search query is required' });
    }

    const posts = await Post.find({
      $or: [
        { title: { $regex: q, $options: 'i' } },
        { content: { $regex: q, $options: 'i' } },
        { tags: { $in: [new RegExp(q, 'i')] } }
      ]
    }).populate('author category', 'username name');

    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Failed to search posts' });
  }
};
