import React, { createContext, useEffect, useState } from "react";
import { getCurrentUser, loginUser, logoutUser, registerUser, setAuthToken, updateUserProfile } from "../services/authService";

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
      // Call loginUser which sets the token in localStorage
      await loginUser(email, password);
      // Then get the current user data with the token
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

  // Demo users with different profiles and roadmaps
  const demoUsers = [
    {
      id: 'demo-user-1',
      name: 'Mounika',
      email: 'mounika@example.com',
      role: 'demo',
      isDemo: true,
      profile: {
        title: 'Frontend Developer',
        experience: 'Beginner',
        interests: ['JavaScript', 'React', 'UI/UX'],
        skills: ['HTML', 'CSS', 'Basic JavaScript'],
        goals: ['Master React', 'Learn TypeScript', 'Build portfolio projects']
      },
      roadmapType: 'frontend'
    },
    {
      id: 'demo-user-2',
      name: 'Sai',
      email: 'sai@example.com',
      role: 'demo',
      isDemo: true,
      profile: {
        title: 'Data Scientist',
        experience: 'Intermediate',
        interests: ['Machine Learning', 'Data Visualization', 'Statistics'],
        skills: ['Python', 'SQL', 'Pandas', 'NumPy'],
        goals: ['Master deep learning', 'Contribute to open source', 'Transition to AI research']
      },
      roadmapType: 'data-science'
    },
    {
      id: 'demo-user-3',
      name: 'Mohana',
      email: 'mohana@example.com',
      role: 'demo',
      isDemo: true,
      profile: {
        title: 'UX Designer',
        experience: 'Advanced',
        interests: ['User Research', 'Interaction Design', 'Prototyping'],
        skills: ['Figma', 'Adobe XD', 'User Testing', 'Wireframing'],
        goals: ['Lead design team', 'Improve accessibility knowledge', 'Learn motion design']
      },
      roadmapType: 'ux-design'
    },
    {
      id: 'demo-user-4',
      name: 'Naimish',
      email: 'naimish@example.com',
      role: 'demo',
      isDemo: true,
      profile: {
        title: 'DevOps Engineer',
        experience: 'Intermediate',
        interests: ['Cloud Infrastructure', 'CI/CD', 'Kubernetes'],
        skills: ['Docker', 'AWS', 'Linux', 'Git'],
        goals: ['Master Kubernetes', 'Learn Terraform', 'Implement GitOps workflows']
      },
      roadmapType: 'devops'
    },
    {
      id: 'demo-user-5',
      name: 'Mounika',
      email: 'mounika2@example.com',
      role: 'demo',
      isDemo: true,
      profile: {
        title: 'Mobile Developer',
        experience: 'Beginner',
        interests: ['React Native', 'Flutter', 'Mobile UI'],
        skills: ['JavaScript', 'Basic React', 'CSS'],
        goals: ['Build cross-platform apps', 'Learn native development', 'Publish to app stores']
      },
      roadmapType: 'mobile'
    }
  ];

  // Demo login function
  const demoLogin = (userType = null) => {
    // If userType is provided, find that specific demo user
    // Otherwise, use the first demo user as default
    let demoUserData;
    
    if (userType && typeof userType === 'string') {
      // Find user by roadmap type
      demoUserData = demoUsers.find(user => user.roadmapType === userType) || demoUsers[0];
    } else if (userType && typeof userType === 'number' && userType < demoUsers.length) {
      // Find user by index
      demoUserData = demoUsers[userType];
    } else if (userType && typeof userType === 'object') {
      // Use custom user data
      demoUserData = userType;
    } else {
      // Default to first user
      demoUserData = demoUsers[0];
    }
    
    localStorage.setItem("user", JSON.stringify(demoUserData));
    setCurrentUser(demoUserData);
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
