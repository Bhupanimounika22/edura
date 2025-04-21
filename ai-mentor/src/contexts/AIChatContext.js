import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  createConversation,
  deleteConversation,
  getConversationHistory,
  getUserConversations,
  sendMessage
} from '../services/aiService';
import { AuthContext } from './AuthContext';

export const AIChatContext = createContext();

export const AIChatProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const [conversations, setConversations] = useState([]);
  const [currentConversation, setCurrentConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load user conversations when user is authenticated
  useEffect(() => {
    if (currentUser) {
      loadUserConversations();
    } else {
      setConversations([]);
      setCurrentConversation(null);
      setMessages([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  // Load messages when current conversation changes
  useEffect(() => {
    if (currentConversation) {
      loadConversationMessages(currentConversation.id);
    } else {
      setMessages([]);
    }
  }, [currentConversation]);

  // Load all user conversations
  const loadUserConversations = async () => {
    try {
      setLoading(true);
      const data = await getUserConversations();
      setConversations(data);
      
      // Set current conversation to the most recent one if available
      if (data.length > 0 && !currentConversation) {
        setCurrentConversation(data[0]);
      }
    } catch (err) {
      setError(err.message || 'Failed to load conversations');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Load messages for a specific conversation
  const loadConversationMessages = async (conversationId) => {
    try {
      setLoading(true);
      const data = await getConversationHistory(conversationId);
      setMessages(data);
    } catch (err) {
      setError(err.message || 'Failed to load messages');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Send a message to the AI
  const sendMessageToAI = async (messageText) => {
    try {
      setLoading(true);
      setError(null);
      
      // If no conversation exists, create one
      let conversationId = currentConversation?.id;
      if (!conversationId) {
        const newConversation = await createConversation('New Conversation');
        setCurrentConversation(newConversation);
        conversationId = newConversation.id;
        setConversations([newConversation, ...conversations]);
      }
      
      // Add user message to UI immediately
      const userMessage = {
        id: Date.now().toString(),
        content: messageText,
        role: 'user',
        timestamp: new Date().toISOString()
      };
      
      setMessages(prevMessages => [...prevMessages, userMessage]);
      
      // Send to API and get AI response
      const response = await sendMessage(messageText, conversationId);
      
      // Add AI response to messages
      setMessages(prevMessages => [...prevMessages, response]);
      
      // Update conversation list if title was generated for a new conversation
      if (response.updatedConversation) {
        setConversations(prevConversations => 
          prevConversations.map(conv => 
            conv.id === conversationId ? response.updatedConversation : conv
          )
        );
        setCurrentConversation(response.updatedConversation);
      }
      
      return response;
    } catch (err) {
      setError(err.message || 'Failed to send message');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Create a new conversation
  const startNewConversation = async () => {
    try {
      setLoading(true);
      const newConversation = await createConversation('New Conversation');
      setConversations([newConversation, ...conversations]);
      setCurrentConversation(newConversation);
      setMessages([]);
      return newConversation;
    } catch (err) {
      setError(err.message || 'Failed to create new conversation');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Delete a conversation
  const removeConversation = async (conversationId) => {
    try {
      setLoading(true);
      await deleteConversation(conversationId);
      
      // Update state
      setConversations(conversations.filter(c => c.id !== conversationId));
      
      // If the deleted conversation was the current one, set a new current conversation
      if (currentConversation?.id === conversationId) {
        const nextConversation = conversations.find(c => c.id !== conversationId);
        setCurrentConversation(nextConversation || null);
      }
    } catch (err) {
      setError(err.message || 'Failed to delete conversation');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Switch to a different conversation
  const switchConversation = (conversationId) => {
    const conversation = conversations.find(c => c.id === conversationId);
    if (conversation) {
      setCurrentConversation(conversation);
    }
  };

  const value = {
    conversations,
    currentConversation,
    messages,
    loading,
    error,
    sendMessage: sendMessageToAI,
    startNewConversation,
    deleteConversation: removeConversation,
    switchConversation,
    refreshConversations: loadUserConversations
  };

  return (
    <AIChatContext.Provider value={value}>
      {children}
    </AIChatContext.Provider>
  );
};

// Custom hook for using the AI chat context
export const useAIChat = () => {
  const context = useContext(AIChatContext);
  if (!context) {
    throw new Error('useAIChat must be used within an AIChatProvider');
  }
  return context;
};