import {
  faBook,
  faBookOpen,
  faCalendarAlt,
  faChevronDown,
  faChevronUp,
  faCode,
  faExternalLinkAlt,
  faEye,
  faFilm,
  faFlag,
  faGraduationCap,
  faNewspaper
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Alert, Badge, Button, Card, Col, ListGroup, Row, Spinner } from 'react-bootstrap';
import { useRoadmap } from '../../contexts/RoadmapContext';
import './Roadmap.css';

const getResourceIcon = (type) => {
  switch (type.toLowerCase()) {
    case 'video':
      return faFilm;
    case 'article':
      return faNewspaper;
    case 'book':
      return faBook;
    case 'course':
      return faGraduationCap;
    case 'tool':
      return faCode;
    default:
      return faExternalLinkAlt;
  }
};

const RoadmapVisualizer = ({ roadmap }) => {
  const { getMilestoneContent, loading, error, selectedMilestone, milestoneContent } = useRoadmap();
  const [expandedStage, setExpandedStage] = useState(null);

  const handleMilestoneClick = async (milestone, role, experienceLevel) => {
    try {
      await getMilestoneContent(milestone, role, experienceLevel);
    } catch (err) {
      console.error('Error loading milestone content:', err);
    }
  };

  if (!roadmap) {
    return (
      <Alert variant="info">
        No roadmap selected. Please generate or select a roadmap.
      </Alert>
    );
  }

  return (
    <div className="roadmap-visualizer">
      <Card className="mb-5 border-0 shadow">
        <Card.Body className="p-4">
          <div className="roadmap-header mb-4 p-4 rounded">
            <h2 className="display-5 fw-bold mb-3">{roadmap.title}</h2>
            <p className="lead mb-4">{roadmap.description}</p>
            <div className="roadmap-meta">
              <Badge bg="light" className="me-2 roadmap-tag">
                <FontAwesomeIcon icon={faGraduationCap} className="me-2" />
                {roadmap.role || 'Developer'} Path
              </Badge>
              <Badge bg="light" className="me-2 roadmap-tag">
                <FontAwesomeIcon icon={faCode} className="me-2" />
                {roadmap.experienceLevel || 'Beginner'} Level
              </Badge>
              <Badge bg="light" className="roadmap-tag">
                <FontAwesomeIcon icon={faCalendarAlt} className="me-2" />
                Est. Time: {roadmap.estimatedTimeToComplete || 'Varies'}
              </Badge>
            </div>
          </div>
        </Card.Body>
      </Card>

      {error && <Alert variant="danger">{error}</Alert>}

      <div className="roadmap-stages">
        {roadmap.stages.map((stage, stageIndex) => (
          <div key={stage.id || stageIndex} className="roadmap-stage">
            <div className="shadow-sm rounded overflow-hidden">
              <div 
                className="roadmap-stage-header d-flex justify-content-between align-items-center"
                onClick={() => setExpandedStage(expandedStage === stageIndex ? null : stageIndex)}
                style={{ cursor: 'pointer' }}
              >
                <h4 className="mb-0 d-flex align-items-center">
                  <span className="me-3">{stageIndex + 1}</span>
                  {stage.title}
                </h4>
                <div className="d-flex align-items-center">
                  <Badge bg="light" className="text-dark me-3">
                    <FontAwesomeIcon icon={faCalendarAlt} className="me-2" />
                    {stage.timeToComplete || 'Varies'}
                  </Badge>
                  <FontAwesomeIcon 
                    icon={expandedStage === stageIndex ? faChevronUp : faChevronDown} 
                    className="text-white"
                  />
                </div>
              </div>
              
              {expandedStage === stageIndex && (
                <div className="roadmap-stage-content">
                  <p className="lead mb-4">{stage.description}</p>
                  
                  <div className="roadmap-milestones">
                    {stage.milestones.map((milestone, milestoneIndex) => (
                      <div key={milestone.id || milestoneIndex} className="roadmap-milestone">
                        <Card 
                          className={`milestone-card ${selectedMilestone?.id === milestone.id ? 'selected-milestone' : ''}`}
                          onClick={() => handleMilestoneClick(
                            milestone, 
                            roadmap.role, 
                            roadmap.experienceLevel
                          )}
                        >
                          <Card.Body>
                            <h5>
                              <FontAwesomeIcon 
                                icon={faFlag} 
                                className="me-2 text-primary"
                              />
                              {milestone.title}
                            </h5>
                            <p className="text-muted">{milestone.description}</p>
                            
                            <div className="milestone-resources">
                              <h6>
                                <FontAwesomeIcon 
                                  icon={faBookOpen} 
                                  className="me-2"
                                />
                                Learning Resources
                              </h6>
                              <ListGroup variant="flush">
                                {milestone.resources.slice(0, 3).map((resource, resourceIndex) => (
                                  <ListGroup.Item key={resourceIndex} className="px-0 border-0 py-2">
                                    <div className="d-flex align-items-center">
                                      <div className="resource-icon-wrapper me-3">
                                        <FontAwesomeIcon 
                                          icon={getResourceIcon(resource.type)} 
                                        />
                                      </div>
                                      <div>
                                        <a 
                                          href={resource.url} 
                                          target="_blank" 
                                          rel="noopener noreferrer"
                                          onClick={(e) => e.stopPropagation()}
                                          className="text-decoration-none fw-bold"
                                        >
                                          {resource.title}
                                        </a>
                                        <p className="text-muted small mb-0">{resource.type}</p>
                                      </div>
                                    </div>
                                  </ListGroup.Item>
                                ))}
                              </ListGroup>
                            </div>
                            
                            <Button 
                              variant="primary" 
                              size="sm" 
                              className="mt-3 w-100"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleMilestoneClick(
                                  milestone, 
                                  roadmap.role, 
                                  roadmap.experienceLevel
                                );
                              }}
                            >
                              <FontAwesomeIcon icon={faEye} className="me-2" />
                              View Details
                            </Button>
                          </Card.Body>
                        </Card>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {selectedMilestone && (
        <div className="milestone-details mt-5">
          <Card className="shadow-lg border-0 overflow-hidden">
            <Card.Header className="bg-gradient-primary text-white p-4" style={{ background: 'linear-gradient(135deg, #4776E6 0%, #8E54E9 100%)' }}>
              <div className="d-flex justify-content-between align-items-center">
                <h3 className="mb-0 fw-bold">{selectedMilestone.title}</h3>
                <Badge bg="light" className="text-dark px-3 py-2">
                  <FontAwesomeIcon icon={faFlag} className="me-2" />
                  Milestone
                </Badge>
              </div>
            </Card.Header>
            <Card.Body className="p-0">
              {loading ? (
                <div className="text-center py-5">
                  <Spinner animation="border" style={{ color: '#4776E6' }} />
                  <p className="mt-3">Loading detailed content...</p>
                </div>
              ) : milestoneContent ? (
                <div className="milestone-content">
                  <div className="p-4 border-bottom">
                    <h4 className="mb-3 text-primary">
                      <FontAwesomeIcon icon={faBookOpen} className="me-2" />
                      Overview
                    </h4>
                    <p className="lead">{selectedMilestone.description}</p>
                  </div>
                  
                  {milestoneContent.detailedContent?.content && (
                    <div className="p-4 border-bottom">
                      <h4 className="mb-3 text-primary">
                        <FontAwesomeIcon icon={faGraduationCap} className="me-2" />
                        Detailed Learning Path
                      </h4>
                      <div className="content-area" dangerouslySetInnerHTML={{ 
                        __html: milestoneContent.detailedContent.content
                          .replace(/\n\n/g, '</p><p>')
                          .replace(/\n/g, '<br/>')
                          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                          .replace(/\*(.*?)\*/g, '<em>$1</em>')
                      }} />
                    </div>
                  )}
                  
                  {milestoneContent.detailedContent?.examples && milestoneContent.detailedContent.examples.length > 0 && (
                    <div className="p-4 border-bottom">
                      <h4 className="mb-4 text-primary">
                        <FontAwesomeIcon icon={faCode} className="me-2" />
                        Code Examples
                      </h4>
                      {milestoneContent.detailedContent.examples.map((example, index) => (
                        <Card key={index} className="mb-4 border-0 shadow-sm">
                          <Card.Header className="bg-light py-3">
                            <h5 className="mb-0 fw-bold">{example.title}</h5>
                          </Card.Header>
                          <Card.Body>
                            <pre className="code-block">
                              <code>{example.code}</code>
                            </pre>
                            <div className="mt-3 p-3 bg-light rounded">
                              <h6 className="fw-bold">Explanation:</h6>
                              <p className="mb-0">{example.explanation}</p>
                            </div>
                          </Card.Body>
                        </Card>
                      ))}
                    </div>
                  )}
                  
                  <div className="p-4 border-bottom">
                    <h4 className="mb-4 text-primary">
                      <FontAwesomeIcon icon={faBook} className="me-2" />
                      Learning Resources
                    </h4>
                    <Row className="g-4">
                      {[...selectedMilestone.resources, ...(milestoneContent.detailedContent?.additionalResources || [])].map((resource, index) => (
                        <Col lg={6} key={index}>
                          <Card className="h-100 resource-link-card border-0">
                            <Card.Body className="p-0">
                              <div className="d-flex p-3">
                                <div className="resource-icon-wrapper">
                                  <FontAwesomeIcon 
                                    icon={getResourceIcon(resource.type)} 
                                  />
                                </div>
                                <div>
                                  <h5 className="mb-1 fw-bold">{resource.title}</h5>
                                  <p className="text-muted small mb-0">{resource.type}</p>
                                </div>
                              </div>
                              <div className="p-3 border-top">
                                <p className="mb-3">{resource.description}</p>
                                <a 
                                  href={resource.url} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="btn btn-primary"
                                >
                                  Visit Resource <FontAwesomeIcon icon={faExternalLinkAlt} className="ms-1" />
                                </a>
                              </div>
                            </Card.Body>
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  </div>
                  
                  {selectedMilestone.projects && selectedMilestone.projects.length > 0 && (
                    <div className="p-4">
                      <h4 className="mb-4 text-primary">
                        <FontAwesomeIcon icon={faCode} className="me-2" />
                        Hands-on Projects
                      </h4>
                      <Row className="g-4">
                        {selectedMilestone.projects.map((project, index) => (
                          <Col md={6} key={index}>
                            <Card className="h-100 border-0 shadow-sm">
                              <Card.Body className="p-4">
                                <h5 className="fw-bold mb-3">{project.title}</h5>
                                <p className="mb-4">{project.description}</p>
                                <div>
                                  <Badge 
                                    bg={project.difficulty === 'beginner' ? 'success' : 
                                       project.difficulty === 'intermediate' ? 'warning' : 'danger'} 
                                    className="me-2 px-3 py-2"
                                  >
                                    {project.difficulty}
                                  </Badge>
                                  {project.skills && project.skills.map((skill, skillIndex) => (
                                    <Badge bg="secondary" key={skillIndex} className="me-1 mb-1 px-2 py-1">{skill}</Badge>
                                  ))}
                                </div>
                              </Card.Body>
                            </Card>
                          </Col>
                        ))}
                      </Row>
                    </div>
                  )}
                </div>
              ) : (
                <Alert variant="info" className="m-4">
                  Select a milestone to view detailed content.
                </Alert>
              )}
            </Card.Body>
          </Card>
        </div>
      )}
    </div>
  );
};

export default RoadmapVisualizer;