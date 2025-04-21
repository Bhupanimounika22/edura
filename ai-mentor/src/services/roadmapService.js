import axios from 'axios';

const API_URL = 'http://localhost:5002/api/roadmaps';

/**
 * Get all public roadmaps
 * @returns {Promise<Array>} - List of public roadmaps
 */
export const getPublicRoadmaps = async () => {
  try {
    const response = await axios.get(`${API_URL}/public`);
    return response.data;
  } catch (error) {
    console.error('Error fetching public roadmaps:', error);
    throw error.response?.data || error.message;
  }
};

/**
 * Get roadmaps by search criteria
 * @param {Object} criteria - Search criteria (role, experienceLevel, etc.)
 * @returns {Promise<Array>} - List of matching roadmaps
 */
export const searchRoadmaps = async (criteria) => {
  try {
    const response = await axios.post(`${API_URL}/search`, criteria);
    return response.data;
  } catch (error) {
    console.error('Error searching roadmaps:', error);
    throw error.response?.data || error.message;
  }
};

/**
 * Get a specific roadmap by ID
 * @param {string} roadmapId - Roadmap ID
 * @returns {Promise<Object>} - Roadmap data
 */
export const getRoadmapById = async (roadmapId) => {
  try {
    const response = await axios.get(`${API_URL}/${roadmapId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching roadmap ${roadmapId}:`, error);
    throw error.response?.data || error.message;
  }
};

/**
 * Save a roadmap to the backend
 * @param {Object} roadmapData - Roadmap data
 * @param {boolean} isPublic - Whether the roadmap should be public
 * @returns {Promise<Object>} - Saved roadmap data with ID
 */
export const saveRoadmapToBackend = async (roadmapData, isPublic = false) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication required to save roadmaps to server');
    }

    const payload = {
      ...roadmapData,
      isPublic
    };

    const config = {
      headers: {
        'x-auth-token': token
      }
    };

    // If roadmap has an ID, update it, otherwise create new
    if (roadmapData.id && roadmapData.id.startsWith('server-')) {
      const response = await axios.put(`${API_URL}/${roadmapData.id.replace('server-', '')}`, payload, config);
      return response.data;
    } else {
      const response = await axios.post(API_URL, payload, config);
      return response.data;
    }
  } catch (error) {
    console.error('Error saving roadmap to backend:', error);
    throw error.response?.data || error.message;
  }
};

/**
 * Get user's roadmaps
 * @returns {Promise<Array>} - List of user's roadmaps
 */
export const getUserRoadmaps = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      return [];
    }

    const response = await axios.get(`${API_URL}/user`, {
      headers: {
        'x-auth-token': token
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user roadmaps:', error);
    throw error.response?.data || error.message;
  }
};

/**
 * Delete a roadmap
 * @param {string} roadmapId - Roadmap ID
 * @returns {Promise<boolean>} - Success status
 */
export const deleteRoadmapFromBackend = async (roadmapId) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication required to delete roadmaps');
    }

    // Only delete from backend if it's a server roadmap
    if (roadmapId.startsWith('server-')) {
      await axios.delete(`${API_URL}/${roadmapId.replace('server-', '')}`, {
        headers: {
          'x-auth-token': token
        }
      });
    }
    return true;
  } catch (error) {
    console.error(`Error deleting roadmap ${roadmapId}:`, error);
    throw error.response?.data || error.message;
  }
};

/**
 * Toggle the public status of a roadmap
 * @param {string} roadmapId - Roadmap ID
 * @param {boolean} isPublic - New public status
 * @returns {Promise<Object>} - Updated roadmap
 */
export const toggleRoadmapPublicStatus = async (roadmapId, isPublic) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication required to update roadmap status');
    }

    const response = await axios.patch(
      `${API_URL}/${roadmapId.replace('server-', '')}/public`,
      { isPublic },
      {
        headers: {
          'x-auth-token': token
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating roadmap ${roadmapId} public status:`, error);
    throw error.response?.data || error.message;
  }
};