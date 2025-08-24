import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import AppLayout from './components/AppLayout';
import './App.css';
function App() {
  // Get userId from token (if exists)
  const token = localStorage.getItem('token');
  let userId = null;

  if (token) {
    try {
      userId = JSON.parse(atob(token.split('.')[1])).id;
    } catch (err) {
      console.error('Invalid token:', err);
    }
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Redirect plain /profile to actual user profile */}
        <Route
          path="/profile"
          element={
            userId ? (
              <Navigate to={`/profile/${userId}`} replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Protected App Layout with Sidebar */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AppLayout userId={userId} />
            </ProtectedRoute>
          }
        >
          {/* Nested inside AppLayout */}
          <Route path="home" element={<Home />} />
          <Route path="profile/:userId" element={<Profile />} />
          {/* You can also add: <Route path="create" element={<CreatePost />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
