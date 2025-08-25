import axios from 'axios';

// Create an instance of axios with the base URL from environment variables
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Export the API client
export default apiClient;
