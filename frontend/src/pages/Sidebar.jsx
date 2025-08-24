import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../App.css";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="sidebar">
      <h2>MyApp</h2>
      <ul>
        <li><button onClick={() => navigate('/home')}>🏠 Home</button></li>
        <li><button onClick={() => navigate('/profile')}>🧑‍💼 Profile</button></li>
        <li><button onClick={handleLogout}>🚪 Logout</button></li>
      </ul>
    </div>
  );
}

export default Sidebar;