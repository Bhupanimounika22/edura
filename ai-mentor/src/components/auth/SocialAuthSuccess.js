import React, { useContext, useEffect } from 'react';
import { Alert, Container, Spinner } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { setAuthToken } from '../../services/authService';

const SocialAuthSuccess = () => {
  const { setCurrentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    const processToken = async () => {
      try {
        // Get token from URL query params
        const params = new URLSearchParams(location.search);
        const token = params.get('token');
        
        if (!token) {
          throw new Error('No authentication token received');
        }
        
        // Store token in localStorage
        localStorage.setItem('token', token);
        
        // Set auth token in axios headers
        setAuthToken(token);
        
        // Redirect to dashboard
        navigate('/dashboard');
      } catch (error) {
        console.error('Social auth error:', error);
        // Redirect to login page after 3 seconds
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      }
    };
    
    processToken();
  }, [location, navigate, setCurrentUser]);
  
  return (
    <Container className="text-center py-5">
      <h2>Processing your login...</h2>
      <div className="my-4">
        <Spinner animation="border" variant="primary" />
      </div>
      <Alert variant="info">
        Please wait while we complete your authentication.
      </Alert>
    </Container>
  );
};

export default SocialAuthSuccess;