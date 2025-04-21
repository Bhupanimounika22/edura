/**
 * Configuration utility for accessing environment variables
 * 
 * This module provides a centralized way to access environment variables
 * and configuration settings throughout the application.
 */

// API Keys
export const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY;

// Service URLs
export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5002/api';
export const AUTH_URL = process.env.REACT_APP_AUTH_URL || 'http://localhost:5002/api/auth';

// Feature Flags
export const ENABLE_ANALYTICS = process.env.REACT_APP_ENABLE_ANALYTICS === 'true';

// Environment
export const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';
export const IS_PRODUCTION = process.env.NODE_ENV === 'production';
export const IS_TEST = process.env.NODE_ENV === 'test';

/**
 * Get an environment variable with a fallback value
 * @param {string} key - The environment variable key
 * @param {*} fallback - The fallback value if the environment variable is not set
 * @returns {string} The environment variable value or fallback
 */
export const getEnvVariable = (key, fallback = '') => {
  return process.env[`REACT_APP_${key}`] || fallback;
};

/**
 * Check if a feature flag is enabled
 * @param {string} featureName - The name of the feature flag
 * @returns {boolean} Whether the feature is enabled
 */
export const isFeatureEnabled = (featureName) => {
  return process.env[`REACT_APP_ENABLE_${featureName.toUpperCase()}`] === 'true';
};

const config = {
  GEMINI_API_KEY,
  API_BASE_URL,
  AUTH_URL,
  ENABLE_ANALYTICS,
  IS_DEVELOPMENT,
  IS_PRODUCTION,
  IS_TEST,
  getEnvVariable,
  isFeatureEnabled
};

export default config;