import axios from 'axios';

const makeRequest = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

makeRequest.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
      console.log('Authorization Header:', config.headers['Authorization']); // Log the Authorization header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { makeRequest };
