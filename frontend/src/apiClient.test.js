// Simple test to verify API client configuration
import apiClient from './apiClient';

// Test that the API client is configured correctly
console.log('API Client Configuration Test:');
console.log('Base URL:', apiClient.defaults.baseURL);
console.log('Default Headers:', apiClient.defaults.headers);

// Verify that environment variables are being used
if (import.meta.env.VITE_API_URL) {
  console.log('✅ VITE_API_URL environment variable is set:', import.meta.env.VITE_API_URL);
} else {
  console.log('ℹ️  VITE_API_URL not set, using default:', apiClient.defaults.baseURL);
}

// Test that the client can make requests
export const testApiConnection = async () => {
  try {
    // This would be a simple test request to verify connectivity
    console.log('Testing API connectivity...');
    // Note: In a real test, you might want to mock this or use a test endpoint
  } catch (error) {
    console.error('API connection test failed:', error);
  }
};

export default apiClient;
