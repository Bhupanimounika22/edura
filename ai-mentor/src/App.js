import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useContext } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';

// Layout Components
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';

// Auth Components
import ForgotPassword from './components/auth/ForgotPassword';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import SocialAuthSuccess from './components/auth/SocialAuthSuccess';

// Main Components
import About from './components/home/About';
import Home from './components/home/Home';
import Onboarding from './components/home/Onboarding';
import JobDetail from './components/jobs/JobDetailNew';
import Jobs from './components/jobs/JobsNew';
import NotFound from './components/layout/NotFound';
import Profile from './components/profile/Profile';
import Resources from './components/resources/Resources';
import Roadmap from './components/roadmap/Roadmap';
import RoadmapDetail from './components/roadmap/RoadmapDetail';
import RoadmapPage from './components/roadmap/RoadmapPage';

import CareerPage from './pages/CareerPage';
 

// Context
import { AIChatProvider } from './contexts/AIChatContext';
import { AuthContext, AuthProvider } from './contexts/AuthContext';
import { RoadmapProvider } from './contexts/RoadmapContext';

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useContext(AuthContext);
  
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  
  return currentUser ? children : <Navigate to="/login" />;
};

// Note: We're keeping this component for future use but not currently using it
// If you need to use it later, remove the eslint comment
// eslint-disable-next-line no-unused-vars
const DemoAwareRoute = ({ component: Component, redirectPath }) => {
  const { currentUser } = useContext(AuthContext);
  
  // If user is a demo user, redirect to the specified path
  if (currentUser && currentUser.role === 'demo') {
    return <Navigate to={redirectPath} replace />;
  }
  
  // Otherwise, render the component
  return <Component />;
};

function AppContent() {
  const { currentUser } = useContext(AuthContext);

  return (
    <Router>
      <div className="App d-flex flex-column min-vh-100">
        <Header />
        <main className="flex-grow-1">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={currentUser ? <Navigate to="/roadmap-generator" /> : <Login />} />
            <Route path="/register" element={currentUser ? <Navigate to="/roadmap-generator" /> : <Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/about" element={<About />} />
            <Route path="/social-auth-success" element={<SocialAuthSuccess />} />
            
            {/* Protected Routes */}
            <Route path="/onboarding" element={
              <ProtectedRoute>
                <Onboarding />
              </ProtectedRoute>
            } />

            <Route path="/roadmap/:id" element={
              <ProtectedRoute>
                <RoadmapDetail />
              </ProtectedRoute>
            } />
            <Route path="/roadmap" element={
              <ProtectedRoute>
                <Roadmap />
              </ProtectedRoute>
            } />
            <Route path="/roadmap-generator" element={
              <ProtectedRoute>
                <RoadmapPage />
              </ProtectedRoute>
            } />
            <Route path="/jobs/:id" element={
              <ProtectedRoute>
                <JobDetail />
              </ProtectedRoute>
            } />
            <Route path="/jobs" element={
              <ProtectedRoute>
                <Jobs />
              </ProtectedRoute>
            } />
            <Route path="/resources" element={
              <ProtectedRoute>
                <Resources />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            
            {/* Career Advisor Route */}
            <Route path="/career-advisor" element={
              <ProtectedRoute>
                <CareerPage />
              </ProtectedRoute>
            } />
            

            
          
            
            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AIChatProvider>
        <RoadmapProvider>
          <AppContent />
        </RoadmapProvider>
      </AIChatProvider>
    </AuthProvider>
  );
}

export default App;
