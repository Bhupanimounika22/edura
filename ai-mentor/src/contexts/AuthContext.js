import React, { createContext, useEffect, useState } from "react";
import { getCurrentUser, loginUser, registerUser, logoutUser, setAuthToken, updateUserProfile } from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        // Check if token exists
        const token = localStorage.getItem("token");
        if (token) {
          setAuthToken(token);
          const userData = await getCurrentUser();
          if (userData) {
            setCurrentUser(userData);
          }
        }
      } catch (error) {
        console.error("Error loading user:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      const data = await loginUser(email, password);
      const userData = await getCurrentUser();
      setCurrentUser(userData);
      return userData;
    } catch (error) {
      throw error;
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      await registerUser(userData);
      const user = await getCurrentUser();
      setCurrentUser(user);
      return user;
    } catch (error) {
      throw error;
    }
  };

  // Update profile function
  const updateProfile = async (profileData) => {
    try {
      const updatedUser = await updateUserProfile(profileData);
      setCurrentUser(updatedUser);
      return updatedUser;
    } catch (error) {
      throw error;
    }
  };

  // Logout function
  const logout = () => {
    logoutUser();
    setCurrentUser(null);
    setAuthToken(null);
  };

  // Demo login function (for backward compatibility)
  const demoLogin = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setCurrentUser(userData);
    return true;
  };

  const value = {
    currentUser,
    login,
    register,
    logout,
    updateProfile,
    demoLogin,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
