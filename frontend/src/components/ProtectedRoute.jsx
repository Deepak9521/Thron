import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');

  // Debug log to verify token
  console.log("ProtectedRoute token:", token);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
