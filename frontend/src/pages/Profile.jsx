import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiClient from '../apiClient';
import '../App.css';

function Profile() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await apiClient.get(`/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(res.data.user);
        setPosts(res.data.posts);
      } catch (err) {
        console.error("❌ Error loading profile:", err.response?.data || err.message);
      }
    };

    fetchUserProfile();
  }, [userId, token]);

  return (
    <div className="app-container">
      <div className="profile-card">
        {/* Header */}
        {user && (
          <div className="profile-header">
            <h1>👤 {user.name}'s Profile</h1>
            <span className="text-muted">{user.email}</span>
          </div>
        )}

        {/* Posts */}
        <h2 className="profile-subtitle">📝 Your Posts</h2>
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post._id} className="post-card">
              <p>{post.content}</p>
              <div className="post-meta">
                <span>🕒 {new Date(post.createdAt).toLocaleString()}</span>
                <span>💬 {post.comments?.length || 0} | ❤️ {post.likes?.length || 0}</span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted italic">You haven’t posted anything yet.</p>
        )}
      </div>
    </div>
  );
}

export default Profile;