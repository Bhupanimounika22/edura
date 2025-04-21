import axios from 'axios';
import { API_BASE_URL } from '../utils/config';

const API_URL = API_BASE_URL;

// Send a message to the AI assistant
export const sendMessage = async (message, conversationId = null) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Not authenticated');
    
    const response = await axios.post(`${API_URL}/ai/chat`, 
      { message, conversationId }, 
      {
        headers: {
          'x-auth-token': token
        }
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get conversation history
export const getConversationHistory = async (conversationId) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Not authenticated');
    
    const response = await axios.get(`${API_URL}/ai/conversations/${conversationId}`, {
      headers: {
        'x-auth-token': token
      }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get all user conversations
export const getUserConversations = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Not authenticated');
    
    const response = await axios.get(`${API_URL}/ai/conversations`, {
      headers: {
        'x-auth-token': token
      }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Create a new conversation
export const createConversation = async (title) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Not authenticated');
    
    const response = await axios.post(`${API_URL}/ai/conversations`, 
      { title }, 
      {
        headers: {
          'x-auth-token': token
        }
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Delete a conversation
export const deleteConversation = async (conversationId) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Not authenticated');
    
    const response = await axios.delete(`${API_URL}/ai/conversations/${conversationId}`, {
      headers: {
        'x-auth-token': token
      }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};