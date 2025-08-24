const express = require('express');
const router = express.Router();
const { createPost, getAllPosts, toggleLike, addComment, deletePost, getPostsByUser} = require('../controllers/postController');


router.post('/create', createPost);
router.get('/', getAllPosts);
router.put('/:id/like', toggleLike);
router.post('/:id/comment', addComment);
router.delete('/:id', deletePost);
router.get('/user/:userId', getPostsByUser);


module.exports = router;
