import axios from 'axios';

const API_URL = 'http://localhost:5002/api/auth';

// Register user
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Login user
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Get current user
export const getCurrentUser = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) return null;
    
    const response = await axios.get(`${API_URL}/user`, {
      headers: {
        'x-auth-token': token
      }
    });
    return response.data;
  } catch (error) {
    localStorage.removeItem('token');
    return null;
  }
};

// Update user profile
export const updateUserProfile = async (profileData) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Not authenticated');
    
    const response = await axios.put(`${API_URL}/profile`, profileData, {
      headers: {
        'x-auth-token': token
      }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Logout user
export const logoutUser = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

// Set auth token for all requests
export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};