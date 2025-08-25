import React, { useEffect, useState } from 'react';
import apiClient from '../apiClient';
import { Link } from 'react-router-dom';
import '../App.css';

function Home() {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState('');
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [commentText, setCommentText] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const userId = token ? JSON.parse(atob(token.split('.')[1])).id : null;

  // Redirect to login if no token
  useEffect(() => {
    if (!token) window.location.href = '/login';
  }, [token]);

  // Fetch posts
  useEffect(() => {
    apiClient
      .get('/posts', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setPosts(res.data))
      .catch((err) => console.error('❌ Error fetching posts:', err));
  }, []);

  const handlePost = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      const res = await apiClient.post(
        '/posts/create',
        { content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPosts([res.data.post, ...posts]);
      setContent('');
    } catch (err) {
      console.error('❌ Error posting:', err);
      alert('You must be logged in to post.');
    }
  };

  const handleLike = async (postId) => {
    try {
      const res = await apiClient.put(
        `/posts/${postId}/like`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPosts((prev) =>
        prev.map((post) =>
          post._id === postId ? { ...post, likes: res.data.likes } : post
        )
      );
    } catch (err) {
      console.error('❌ Error liking post:', err);
    }
  };

  const handleCommentSubmit = async (postId) => {
    if (!commentText[postId]?.trim()) return;

    try {
      const res = await apiClient.post(
        `/posts/${postId}/comment`,
        { text: commentText[postId] },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPosts((prev) =>
        prev.map((post) =>
          post._id === postId ? { ...post, comments: res.data.comments } : post
        )
      );
      setCommentText((prev) => ({ ...prev, [postId]: '' }));
    } catch (err) {
      console.error('❌ Error posting comment:', err);
    }
  };

  const handleDelete = async (postId) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    try {
      await apiClient.delete(`/posts/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts((prev) => prev.filter((post) => post._id !== postId));
    } catch (err) {
      console.error('❌ Error deleting post:', err);
    }
  };

  return (
    <div className="main-content">
      <h1>🏠 Home</h1>

      {/* Create Post Box */}
      <div className="create-post-container">
        <form onSubmit={handlePost}>
          <textarea
            rows="3"
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button type="submit">Post</button>
        </form>
      </div>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="🔍 Search posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Posts */}
      <div className="recent-posts">
        <h3>📰 Recent Posts</h3>
        {posts.length === 0 ? (
          <p>No posts yet.</p>
        ) : (
          posts
            .filter((post) =>
              post.content.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((post) => (
              <div key={post._id} className="card">
                <p>{post.content}</p>

                <div className="post-meta">
                  <span>
                    👤{' '}
                    {post.user ? (
                      <Link to={`/profile/${post.user._id}`}>
                        {post.user.name}
                      </Link>
                    ) : (
                      'Unknown'
                    )}
                  </span>
                  <span>{new Date(post.createdAt).toLocaleString()}</span>
                </div>

                <div className="post-actions">
                  <button onClick={() => handleLike(post._id)}>❤️ Like</button>
                  <span>{post.likes?.length || 0} likes</span>
                  {post.user?._id === userId && (
                    <button onClick={() => handleDelete(post._id)}>
                      🗑️ Delete
                    </button>
                  )}
                </div>

                <div className="comment-section">
  <form
    onSubmit={(e) => {
      e.preventDefault();
      handleCommentSubmit(post._id);
    }}
  >
    <input
      type="text"
      placeholder="Add a comment..."
      value={commentText[post._id] || ''}
      onChange={(e) =>
        setCommentText((prev) => ({
          ...prev,
          [post._id]: e.target.value,
        }))
      }
      className="comment-input"
    />
  </form>

  <div className="comments">
    {post.comments?.slice(0, 3).map((comment, index) => (
      <div key={index} className="comment">
        💬 {comment.text}
      </div>
    ))}
  </div>
                </div>
              </div>
            ))
        )}
      </div>
    </div>
  );
}

export default Home;
