const Post = require('../models/postModel');
const jwt = require('jsonwebtoken');

// 1. Create post
exports.createPost = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const post = new Post({
      user: decoded.id,
      content: req.body.content,
    });

    await post.save();
    res.status(201).json({ message: "✅ Post created", post });
  } catch (err) {
    res.status(401).json({ error: "Unauthorized or invalid token" });
  }
};

// 2. Get all posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('user', 'name')
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
};

// 3. Toggle like/unlike
exports.toggleLike = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ error: "Post not found" });

    const userId = decoded.id;
    const alreadyLiked = post.likes.includes(userId);

    if (alreadyLiked) {
      post.likes.pull(userId); // unlike
    } else {
      post.likes.push(userId); // like
    }

    await post.save();

    res.status(200).json({
      message: alreadyLiked ? "❌ Unliked" : "❤️ Liked",
      likes: post.likes
    });
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: "Invalid token or post ID" });
  }
};

// 4. Add comment
exports.addComment = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });

    const comment = {
      user: decoded.id,
      text: req.body.text,
    };

    post.comments.unshift(comment); // newest comment on top
    await post.save();

    res.status(201).json({ message: "💬 Comment added", comments: post.comments });
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: "Invalid token or request" });
  }
};

// 5. Delete post (optional)
exports.deletePost = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ error: "Post not found" });

    // Only allow the user who created the post to delete it
    if (post.user.toString() !== decoded.id) {
      return res.status(403).json({ error: "Access denied" });
    }

    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "🗑️ Post deleted" });
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: "Invalid token or request" });
  }
};

// 6. User profile
exports.getPostsByUser = async (req, res) => {
  try {
    const posts = await Post.find({ user: req.params.userId })
      .populate('user', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user's posts" });
  }
};
