const User = require('../models/userModel');
const Post = require('../models/postModel');

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    const posts = await Post.find({ user: user._id }).sort({ createdAt: -1 });
    res.json({ user, posts });
  } catch (err) {
    console.error('❌ Error in getUserProfile:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getUserProfile };
