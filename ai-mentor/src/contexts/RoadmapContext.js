import React, { createContext, useContext, useEffect, useState } from 'react';
import { generateMilestoneContent, generateRoadmap } from '../services/generativeAIService';
import {
  deleteRoadmapFromBackend,
  getPublicRoadmaps,
  getUserRoadmaps,
  saveRoadmapToBackend,
  searchRoadmaps,
  toggleRoadmapPublicStatus
} from '../services/roadmapService';
import { AuthContext } from './AuthContext';

export const RoadmapContext = createContext();

export const RoadmapProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const [roadmaps, setRoadmaps] = useState([]);
  const [publicRoadmaps, setPublicRoadmaps] = useState([]);
  const [currentRoadmap, setCurrentRoadmap] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedMilestone, setSelectedMilestone] = useState(null);
  const [milestoneContent, setMilestoneContent] = useState(null);
  const [milestoneCache, setMilestoneCache] = useState({});

  // Load public roadmaps when component mounts
  useEffect(() => {
    fetchPublicRoadmaps();
  }, []);

  // Fetch public roadmaps from backend
  const fetchPublicRoadmaps = async () => {
    try {
      setLoading(true);
      const publicRoadmapsData = await getPublicRoadmaps();
      setPublicRoadmaps(publicRoadmapsData);
      return publicRoadmapsData;
    } catch (err) {
      console.error('Error fetching public roadmaps:', err);
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Search for existing roadmaps before generating a new one
  const findSimilarRoadmap = async (role, experienceLevel) => {
    try {
      const results = await searchRoadmaps({ role, experienceLevel });
      return results.length > 0 ? results[0] : null;
    } catch (err) {
      console.error('Error searching for similar roadmaps:', err);
      return null;
    }
  };

  // Generate a new roadmap or use an existing one
  const createRoadmap = async (role, languages, experienceLevel) => {
    try {
      setLoading(true);
      setError(null);
      
      // First, check if a similar roadmap already exists
      const existingRoadmap = await findSimilarRoadmap(role, experienceLevel);
      
      if (existingRoadmap) {
        // Use the existing roadmap but customize it for the user
        const customizedRoadmap = {
          ...existingRoadmap,
          id: `roadmap-${Date.now()}`, // Local ID for now
          createdAt: new Date().toISOString(),
          userId: currentUser?.id || 'guest',
          isCustomized: true,
          originalRoadmapId: existingRoadmap.id,
          languages: languages || []
        };
        
        // Add the roadmap to the list
        setRoadmaps(prevRoadmaps => [customizedRoadmap, ...prevRoadmaps]);
        setCurrentRoadmap(customizedRoadmap);
        
        // Save to local storage
        saveRoadmap(customizedRoadmap);
        
        return customizedRoadmap;
      } else {
        // Generate a new roadmap
        const roadmapData = await generateRoadmap(role, languages, experienceLevel);
        
        // Add metadata to the roadmap
        const newRoadmap = {
          ...roadmapData,
          id: `roadmap-${Date.now()}`,
          createdAt: new Date().toISOString(),
          role,
          languages: languages || [],
          experienceLevel,
          userId: currentUser?.id || 'guest',
          isPublic: false
        };
        
        // Add the new roadmap to the list
        setRoadmaps(prevRoadmaps => [newRoadmap, ...prevRoadmaps]);
        setCurrentRoadmap(newRoadmap);
        
        // Save to local storage
        saveRoadmap(newRoadmap);
        
        // If user is logged in, also save to backend
        if (currentUser) {
          try {
            const savedRoadmap = await saveRoadmapToBackend(newRoadmap, false);
            // Update the roadmap with the server ID
            const updatedRoadmap = {
              ...newRoadmap,
              id: `server-${savedRoadmap.id}`
            };
            setCurrentRoadmap(updatedRoadmap);
            setRoadmaps(prevRoadmaps => 
              prevRoadmaps.map(r => r.id === newRoadmap.id ? updatedRoadmap : r)
            );
            saveRoadmap(updatedRoadmap);
          } catch (saveErr) {
            console.error('Error saving to backend, keeping local copy:', saveErr);
          }
        }
        
        return newRoadmap;
      }
    } catch (err) {
      setError(err.message || 'Failed to generate roadmap');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Get detailed content for a milestone with caching
  const getMilestoneContent = async (milestone, role, experienceLevel) => {
    try {
      setLoading(true);
      setError(null);
      setSelectedMilestone(milestone);
      
      // Create a cache key
      const cacheKey = `${milestone.id}-${role || currentRoadmap?.role || 'developer'}-${experienceLevel || currentRoadmap?.experienceLevel || 'beginner'}`;
      
      // Check if we have this milestone in cache
      if (milestoneCache[cacheKey]) {
        setMilestoneContent(milestoneCache[cacheKey]);
        return milestoneCache[cacheKey];
      }
      
      // If not in cache, generate new content
      const enhancedMilestone = await generateMilestoneContent(
        milestone, 
        role || currentRoadmap?.role || 'developer',
        experienceLevel || currentRoadmap?.experienceLevel || 'beginner'
      );
      
      // Update cache
      setMilestoneCache(prevCache => ({
        ...prevCache,
        [cacheKey]: enhancedMilestone
      }));
      
      setMilestoneContent(enhancedMilestone);
      return enhancedMilestone;
    } catch (err) {
      setError(err.message || 'Failed to generate milestone content');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Save roadmap to local storage and optionally to backend
  const saveRoadmap = async (roadmap, saveToBackend = false) => {
    try {
      // Get existing roadmaps from localStorage
      const savedRoadmaps = JSON.parse(localStorage.getItem('roadmaps') || '[]');
      
      // Check if this roadmap already exists
      const existingIndex = savedRoadmaps.findIndex(r => r.id === roadmap.id);
      
      if (existingIndex >= 0) {
        // Update existing roadmap
        savedRoadmaps[existingIndex] = roadmap;
      } else {
        // Add new roadmap
        savedRoadmaps.push(roadmap);
      }
      
      // Save back to localStorage
      localStorage.setItem('roadmaps', JSON.stringify(savedRoadmaps));
      
      // Update state
      setRoadmaps(savedRoadmaps);
      
      // If requested and user is logged in, save to backend
      if (saveToBackend && currentUser && roadmap) {
        try {
          const savedRoadmap = await saveRoadmapToBackend(roadmap, roadmap.isPublic || false);
          // Update the roadmap with the server ID
          const updatedRoadmap = {
            ...roadmap,
            id: `server-${savedRoadmap.id}`
          };
          
          // Update in localStorage and state
          const updatedRoadmaps = savedRoadmaps.map(r => 
            r.id === roadmap.id ? updatedRoadmap : r
          );
          localStorage.setItem('roadmaps', JSON.stringify(updatedRoadmaps));
          setRoadmaps(updatedRoadmaps);
          
          if (currentRoadmap?.id === roadmap.id) {
            setCurrentRoadmap(updatedRoadmap);
          }
          
          return updatedRoadmap;
        } catch (saveErr) {
          console.error('Error saving to backend:', saveErr);
        }
      }
      
      return roadmap;
    } catch (err) {
      console.error('Error saving roadmap:', err);
      return null;
    }
  };

  // Load roadmaps from local storage and backend
  const loadRoadmaps = async () => {
    try {
      setLoading(true);
      
      // Load from localStorage
      const localRoadmaps = JSON.parse(localStorage.getItem('roadmaps') || '[]');
      
      // Filter local roadmaps for the current user
      const userLocalRoadmaps = currentUser?.id 
        ? localRoadmaps.filter(r => r.userId === currentUser.id)
        : localRoadmaps;
      
      let allRoadmaps = [...userLocalRoadmaps];
      
      // If user is logged in, also load from backend
      if (currentUser) {
        try {
          const backendRoadmaps = await getUserRoadmaps();
          
          // Transform backend roadmaps to have server- prefix in ID
          const transformedBackendRoadmaps = backendRoadmaps.map(r => ({
            ...r,
            id: `server-${r.id}`
          }));
          
          // Merge, prioritizing backend roadmaps
          const backendIds = new Set(transformedBackendRoadmaps.map(r => r.id));
          
          // Filter out local roadmaps that exist on backend
          const uniqueLocalRoadmaps = userLocalRoadmaps.filter(r => 
            !r.id.startsWith('server-') && !backendIds.has(`server-${r.id.replace('roadmap-', '')}`)
          );
          
          allRoadmaps = [...transformedBackendRoadmaps, ...uniqueLocalRoadmaps];
        } catch (err) {
          console.error('Error loading roadmaps from backend:', err);
        }
      }
      
      // Sort by creation date (newest first)
      allRoadmaps.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      
      setRoadmaps(allRoadmaps);
      return allRoadmaps;
    } catch (err) {
      console.error('Error loading roadmaps:', err);
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Delete a roadmap
  const deleteRoadmap = async (roadmapId) => {
    try {
      // Get existing roadmaps from localStorage
      const savedRoadmaps = JSON.parse(localStorage.getItem('roadmaps') || '[]');
      
      // Filter out the roadmap to delete
      const updatedRoadmaps = savedRoadmaps.filter(r => r.id !== roadmapId);
      
      // Save back to localStorage
      localStorage.setItem('roadmaps', JSON.stringify(updatedRoadmaps));
      
      // Update state
      setRoadmaps(updatedRoadmaps);
      
      // If the current roadmap is being deleted, clear it
      if (currentRoadmap?.id === roadmapId) {
        setCurrentRoadmap(null);
      }
      
      // If it's a server roadmap and user is logged in, delete from backend
      if (roadmapId.startsWith('server-') && currentUser) {
        try {
          await deleteRoadmapFromBackend(roadmapId);
        } catch (deleteErr) {
          console.error('Error deleting from backend:', deleteErr);
        }
      }
      
      return true;
    } catch (err) {
      console.error('Error deleting roadmap:', err);
      return false;
    }
  };

  // Set the current roadmap
  const selectRoadmap = (roadmapId) => {
    const roadmap = roadmaps.find(r => r.id === roadmapId);
    if (roadmap) {
      setCurrentRoadmap(roadmap);
      return roadmap;
    }
    return null;
  };

  // Toggle public status of a roadmap
  const togglePublicStatus = async (roadmapId, isPublic) => {
    try {
      // Find the roadmap
      const roadmap = roadmaps.find(r => r.id === roadmapId);
      if (!roadmap) {
        throw new Error('Roadmap not found');
      }
      
      // Update the roadmap
      const updatedRoadmap = {
        ...roadmap,
        isPublic
      };
      
      // If it's a server roadmap, update on backend
      if (roadmapId.startsWith('server-') && currentUser) {
        await toggleRoadmapPublicStatus(roadmapId, isPublic);
      }
      
      // Save the updated roadmap
      await saveRoadmap(updatedRoadmap, true);
      
      // If this is the current roadmap, update it
      if (currentRoadmap?.id === roadmapId) {
        setCurrentRoadmap(updatedRoadmap);
      }
      
      return updatedRoadmap;
    } catch (err) {
      console.error('Error toggling public status:', err);
      throw err;
    }
  };

  const value = {
    roadmaps,
    publicRoadmaps,
    currentRoadmap,
    loading,
    error,
    selectedMilestone,
    milestoneContent,
    createRoadmap,
    getMilestoneContent,
    saveRoadmap,
    loadRoadmaps,
    deleteRoadmap,
    selectRoadmap,
    setSelectedMilestone,
    setMilestoneContent,
    fetchPublicRoadmaps,
    togglePublicStatus
  };

  return (
    <RoadmapContext.Provider value={value}>
      {children}
    </RoadmapContext.Provider>
  );
};

// Custom hook for using the roadmap context
export const useRoadmap = () => {
  const context = useContext(RoadmapContext);
  if (!context) {
    throw new Error('useRoadmap must be used within a RoadmapProvider');
  }
  return context;
};