
import {
    faCalendarAlt,
    faCheckCircle,
    faComments,
    faLock,
    faRoad,
    faRobot
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react';
import { Badge, Button, Card, Col, Container, ListGroup, ProgressBar, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import './Dashboard.css';
import JobCard from './JobCard';
import ResourceCard from './ResourceCard';
import RoadmapCard from './RoadmapCard';

// Import dummy data
import { jobs, learningProgress, resources, roadmaps } from '../../data/dashboardData';

const Dashboard = () => {
  const { currentUser } = useContext(AuthContext);
  const [activeRoadmaps, setActiveRoadmaps] = useState([]);
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const [recommendedResources, setRecommendedResources] = useState([]);
  const [progress, setProgress] = useState({});
  const [showAIChat, setShowAIChat] = useState(false);
  
  useEffect(() => {
    // In a real app, you would fetch this data from an API
    // For demo purposes, we'll use the imported dummy data
    setActiveRoadmaps(roadmaps.slice(0, 2));
    setRecommendedJobs(jobs.slice(0, 3));
    setRecommendedResources(resources.slice(0, 3));
    setProgress(learningProgress);
  }, []);
  
  const toggleAIChat = () => {
    setShowAIChat(!showAIChat);
  };
  
  return (
    <Container className="py-5">
      {/* Welcome Section */}
      <Row className="mb-4">
        <Col>
          <Card className="welcome-card">
            <Card.Body className="p-4">
              <Row className="align-items-center">
                <Col md={8}>
                  <h2 className="mb-3">Welcome back, {currentUser?.name || 'User'}!</h2>
                  <p className="text-muted mb-0">
                    Continue your learning journey and explore new opportunities tailored to your interests.
                  </p>
                </Col>
                <Col md={4} className="text-md-end mt-3 mt-md-0">
                  <Button variant="primary" as={Link} to="/roadmap/web-development">
                    <FontAwesomeIcon icon={faRoad} className="me-2" />
                    Continue Learning
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      {/* Progress Overview */}
      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Body className="p-4">
              <h3 className="mb-4">Your Learning Progress</h3>
              <Row>
                <Col md={8}>
                  <div className="progress-item mb-3">
                    <div className="d-flex justify-content-between mb-2">
                      <span className="progress-label">Web Development</span>
                      <span className="progress-percentage">{progress.webDevelopment}%</span>
                    </div>
                    <ProgressBar now={progress.webDevelopment} variant="primary" className="custom-progress" />
                  </div>
                  
                  <div className="progress-item mb-3">
                    <div className="d-flex justify-content-between mb-2">
                      <span className="progress-label">UI/UX Design</span>
                      <span className="progress-percentage">{progress.uiUxDesign}%</span>
                    </div>
                    <ProgressBar now={progress.uiUxDesign} variant="info" className="custom-progress" />
                  </div>
                  
                  <div className="progress-item">
                    <div className="d-flex justify-content-between mb-2">
                      <span className="progress-label">Data Science</span>
                      <span className="progress-percentage">{progress.dataScience}%</span>
                    </div>
                    <ProgressBar now={progress.dataScience} variant="success" className="custom-progress" />
                  </div>
                </Col>
                <Col md={4} className="mt-4 mt-md-0">
                  <div className="stats-card text-center p-3 mb-3">
                    <h4 className="stats-number">{progress.completedCourses}</h4>
                    <p className="stats-label mb-0">Courses Completed</p>
                  </div>
                  <div className="stats-card text-center p-3">
                    <h4 className="stats-number">{progress.streak} Days</h4>
                    <p className="stats-label mb-0">Learning Streak</p>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      {/* Active Roadmaps */}
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3 className="mb-0">Your Active Roadmaps</h3>
            <Link to="/roadmaps" className="text-decoration-none">View All</Link>
          </div>
          <Row>
            {activeRoadmaps.map((roadmap) => (
              <Col md={6} key={roadmap.id} className="mb-4">
                <RoadmapCard roadmap={roadmap} />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
      
      {/* Recommended Jobs */}
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3 className="mb-0">Recommended Jobs</h3>
            <Link to="/jobs" className="text-decoration-none">View All</Link>
          </div>
          <Row>
            {recommendedJobs.map((job) => (
              <Col md={4} key={job.id} className="mb-4">
                <JobCard job={job} />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
      
      {/* Learning Resources */}
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3 className="mb-0">Recommended Resources</h3>
            <Link to="/resources" className="text-decoration-none">View All</Link>
          </div>
          <Row>
            {recommendedResources.map((resource) => (
              <Col md={4} key={resource.id} className="mb-4">
                <ResourceCard resource={resource} />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
      
      {/* Daily Tasks */}
      <Row>
        <Col lg={6} className="mb-4">
          <Card>
            <Card.Body className="p-4">
              <h3 className="mb-4">Today's Learning Tasks</h3>
              <ListGroup variant="flush">
                <ListGroup.Item className="d-flex justify-content-between align-items-center py-3 px-0">
                  <div>
                    <FontAwesomeIcon icon={faCheckCircle} className="text-success me-2" />
                    Complete "JavaScript Basics" module
                  </div>
                  <Badge bg="success" pill>Completed</Badge>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between align-items-center py-3 px-0">
                  <div>
                    <FontAwesomeIcon icon={faCalendarAlt} className="text-primary me-2" />
                    Work on personal portfolio project
                  </div>
                  <Badge bg="warning" text="dark" pill>In Progress</Badge>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between align-items-center py-3 px-0">
                  <div>
                    <FontAwesomeIcon icon={faLock} className="text-secondary me-2" />
                    Start "React Fundamentals" course
                  </div>
                  <Badge bg="secondary" pill>Pending</Badge>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between align-items-center py-3 px-0">
                  <div>
                    <FontAwesomeIcon icon={faLock} className="text-secondary me-2" />
                    Practice coding challenges
                  </div>
                  <Badge bg="secondary" pill>Pending</Badge>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        
        <Col lg={6} className="mb-4">
          <Card>
            <Card.Body className="p-4">
              <h3 className="mb-4">Upcoming Events</h3>
              <ListGroup variant="flush">
                <ListGroup.Item className="py-3 px-0">
                  <div className="d-flex">
                    <div className="event-date me-3">
                      <div className="event-month">OCT</div>
                      <div className="event-day">15</div>
                    </div>
                    <div>
                      <h5 className="mb-1">Web Development Workshop</h5>
                      <p className="text-muted mb-0">Learn the latest frontend frameworks and best practices</p>
                      <div className="mt-2">
                        <Badge bg="primary" className="me-2">Online</Badge>
                        <Badge bg="info">Free</Badge>
                      </div>
                    </div>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item className="py-3 px-0">
                  <div className="d-flex">
                    <div className="event-date me-3">
                      <div className="event-month">OCT</div>
                      <div className="event-day">22</div>
                    </div>
                    <div>
                      <h5 className="mb-1">Tech Career Fair</h5>
                      <p className="text-muted mb-0">Connect with top companies hiring in tech</p>
                      <div className="mt-2">
                        <Badge bg="primary" className="me-2">Online</Badge>
                        <Badge bg="info">Free</Badge>
                      </div>
                    </div>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      {/* AI Mentor Chat Button */}
      <div className="ai-chat-button">
        <Button 
          variant="primary" 
          className="rounded-circle" 
          onClick={toggleAIChat}
        >
          <FontAwesomeIcon icon={showAIChat ? faComments : faRobot} />
        </Button>
      </div>
      
      {/* AI Mentor Chat Window */}
      {showAIChat && (
        <div className="ai-chat-window">
          <div className="ai-chat-header">
            <h5 className="mb-0">
              <FontAwesomeIcon icon={faRobot} className="me-2" />
              AI Mentor Assistant
            </h5>
            <Button 
              variant="link" 
              className="p-0 text-white" 
              onClick={toggleAIChat}
            >
              &times;
            </Button>
          </div>
          <div className="ai-chat-body">
            <div className="ai-message">
              <div className="ai-avatar">
                <FontAwesomeIcon icon={faRobot} />
              </div>
              <div className="ai-bubble">
                Hi there! I'm your AI Mentor assistant. How can I help you today?
              </div>
            </div>
            <div className="user-message">
              <div className="user-bubble">
                I need help with my JavaScript learning path.
              </div>
            </div>
            <div className="ai-message">
              <div className="ai-avatar">
                <FontAwesomeIcon icon={faRobot} />
              </div>
              <div className="ai-bubble">
                I'd be happy to help with your JavaScript learning path! Based on your current progress, I recommend focusing on these areas:
                <ul className="mt-2 mb-0">
                  <li>Complete the DOM manipulation module</li>
                  <li>Practice with the coding challenges I've added to your dashboard</li>
                  <li>Start the async JavaScript section next week</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="ai-chat-footer">
            <input 
              type="text" 
              className="form-control" 
              placeholder="Type your message..."
            />
            <Button variant="primary">
              Send
            </Button>
          </div>
        </div>
      )}
    </Container>
  );
};

export default Dashboard;