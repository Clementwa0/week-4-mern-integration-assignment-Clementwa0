const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { verifyToken } = require('@clerk/backend');

exports.protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, token missing' });
  }

  try {
    // First try verifying as local JWT
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select('-password');

      if (!user) throw new Error('User not found');

      req.user = user;
      return next();
    } catch (localError) {
      // If local JWT fails, try Clerk token
      const payload = await verifyToken(token);

      let user = await User.findOne({ clerkId: payload.sub });
      if (!user) {
        // Optional: auto-create Clerk user in DB
        user = await User.create({
          clerkId: payload.sub,
          email: payload.email,
          username: `${payload.first_name || ''}${payload.last_name || ''}`.trim() || 'clerk-user',
          avatar: payload.image_url,
        });
      }

      req.user = user;
      return next();
    }
  } catch (err) {
    console.error('Auth error:', err.message);
    return res.status(401).json({ message: 'Unauthorized token' });
  }
};
