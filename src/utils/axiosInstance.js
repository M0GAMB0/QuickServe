// utils/axiosInstance.js

import axios from 'axios';

// Create an axios instance
const axiosInstance = axios.create({
  baseURL: 'http://192.168.122.155/api', // backend URL
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  config => {
    // Modify request here (e.g., add an Authorization header)
    const token = 'your-auth-token'; // Replace with actual token logic
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    console.log('Request sent:', config);
    return config; // Always return the config object
  },
  error => {
    // Handle request error
    console.error('Request error:', error);
    return Promise.reject(error);
  },
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  response => {
    // Handle successful response (e.g., manipulate data globally)
    console.log('Response received:', response);
    return response;
  },
  error => {
    // Handle response error (e.g., unauthorized, token expired, etc.)
    if (error.response && error.response.status === 401) {
      // Handle token expiration (for example, redirect to login page)
      console.error('Token expired or unauthorized');
    } else if (error.response && error.response.status === 500) {
      // Handle server errors
      console.error('Server error', error.response.data);
    } else {
      // Handle general errors
      console.error('General error:', error.message);
    }

    // Return a rejected promise to propagate the error
    return Promise.reject(error);
  },
);

export default axiosInstance;
