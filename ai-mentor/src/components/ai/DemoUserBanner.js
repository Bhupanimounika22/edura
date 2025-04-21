import React, { useContext } from 'react';
import { Alert } from 'react-bootstrap';
import { AuthContext } from '../../contexts/AuthContext';

const DemoUserBanner = () => {
  const { currentUser } = useContext(AuthContext);
  
  // Only show for demo users
  if (!currentUser || currentUser.role !== 'demo') {
    return null;
  }
  
  return (
    <Alert variant="info" className="mb-4">
      <Alert.Heading>Demo Mode Active</Alert.Heading>
      <p>
        You're currently using AI Mentor in demo mode. Some features like the Dashboard 
        are disabled, but you can fully explore the AI Chat functionality.
      </p>
      <hr />
      <p className="mb-0">
        To access all features, please <a href="/register" className="alert-link">create an account</a>.
      </p>
    </Alert>
  );
};

export default DemoUserBanner;