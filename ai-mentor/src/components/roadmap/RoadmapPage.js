import { faEye, faGlobe, faLock, faPlus, faRoad, faShare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react';
import { Alert, Badge, Button, Col, Container, Dropdown, Row, Spinner, Tab, Tabs } from 'react-bootstrap';
import { AuthContext } from '../../contexts/AuthContext';
import { useRoadmap } from '../../contexts/RoadmapContext';
import './Roadmap.css';
import RoadmapGenerator from './RoadmapGenerator';
import './RoadmapGenerator.css';
import RoadmapVisualizer from './RoadmapVisualizer';

const RoadmapPage = () => {
  const { currentUser } = useContext(AuthContext);
  const { 
    roadmaps, 
    publicRoadmaps,
    currentRoadmap, 
    loadRoadmaps, 
    selectRoadmap, 
    loading, 
    error,
    fetchPublicRoadmaps,
    togglePublicStatus,
    saveRoadmap,
    deleteRoadmap
  } = useRoadmap();
  
  const [activeTab, setActiveTab] = useState('my-roadmaps');
  const [showGenerator, setShowGenerator] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const [filterLevel, setFilterLevel] = useState('');

  useEffect(() => {
    // Load saved roadmaps when component mounts
    const loadAllRoadmaps = async () => {
      const savedRoadmaps = await loadRoadmaps();
      await fetchPublicRoadmaps();
      
      // If there are roadmaps and none is selected, select the first one
      if (savedRoadmaps.length > 0 && !currentRoadmap) {
        selectRoadmap(savedRoadmaps[0].id);
      }
      
      // If there are no roadmaps, show the generator
      if (savedRoadmaps.length === 0) {
        setShowGenerator(true);
        setActiveTab('create');
      }
    };
    
    loadAllRoadmaps();
  }, []);

  const handleRoadmapGenerated = (roadmap) => {
    setShowGenerator(false);
    setActiveTab('visualize');
  };

  const handleRoadmapSelect = (roadmapId) => {
    selectRoadmap(roadmapId);
    setActiveTab('visualize');
  };
  
  const handleTogglePublic = async (roadmapId, currentStatus) => {
    try {
      await togglePublicStatus(roadmapId, !currentStatus);
      // Refresh public roadmaps
      fetchPublicRoadmaps();
    } catch (err) {
      console.error('Error toggling public status:', err);
    }
  };
  
  const handleDeleteRoadmap = async (roadmapId, event) => {
    event.stopPropagation();
    if (window.confirm('Are you sure you want to delete this roadmap?')) {
      await deleteRoadmap(roadmapId);
    }
  };
  
  // Filter roadmaps based on search term and filters
  const getFilteredRoadmaps = (roadmapList) => {
    return roadmapList.filter(roadmap => {
      const matchesSearch = searchTerm === '' || 
        roadmap.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        roadmap.description.toLowerCase().includes(searchTerm.toLowerCase());
        
      const matchesRole = filterRole === '' || roadmap.role === filterRole;
      const matchesLevel = filterLevel === '' || roadmap.experienceLevel === filterLevel;
      
      return matchesSearch && matchesRole && matchesLevel;
    });
  };
  
  // Get unique roles and experience levels for filters
  const getRoles = () => {
    const roles = new Set();
    [...roadmaps, ...publicRoadmaps].forEach(r => roles.add(r.role));
    return Array.from(roles);
  };
  
  const getExperienceLevels = () => {
    const levels = new Set();
    [...roadmaps, ...publicRoadmaps].forEach(r => levels.add(r.experienceLevel));
    return Array.from(levels);
  };

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-5">
        <div>
          <h1 className="display-5 fw-bold">
            <FontAwesomeIcon icon={faRoad} className="me-3" style={{ color: '#4776E6' }} />
            Learning Roadmaps
          </h1>
          <p className="lead text-muted">Create personalized learning paths powered by AI</p>
        </div>
        <Button 
          variant={showGenerator ? "outline-primary" : "primary"} 
          size="lg"
          className="px-4 py-2 shadow-sm"
          onClick={() => {
            setShowGenerator(!showGenerator);
            if (!showGenerator) setActiveTab('create');
          }}
        >
          <FontAwesomeIcon icon={faPlus} className="me-2" />
          {showGenerator ? 'Hide Generator' : 'Create New Roadmap'}
        </Button>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      <Tabs
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k)}
        className="mb-4 roadmap-tabs"
      >
        <Tab eventKey="my-roadmaps" title={
          <span>
            <FontAwesomeIcon icon={faRoad} className="me-2" />
            My Roadmaps
          </span>
        }>
          {roadmaps.length === 0 ? (
            <div className="text-center py-5">
              <img 
                src="https://cdn-icons-png.flaticon.com/512/6598/6598519.png" 
                alt="No roadmaps" 
                style={{ width: '150px', opacity: 0.5 }}
                className="mb-4"
              />
              <h3 className="mb-3">You don't have any roadmaps yet</h3>
              <p className="text-muted mb-4">Create your first roadmap to start your learning journey!</p>
              <Button 
                variant="primary" 
                size="lg"
                onClick={() => {
                  setShowGenerator(true);
                  setActiveTab('create');
                }}
              >
                <FontAwesomeIcon icon={faPlus} className="me-2" />
                Create Your First Roadmap
              </Button>
            </div>
          ) : (
            <>
              <div className="mb-4 d-flex justify-content-between align-items-center flex-wrap">
                <div className="search-filters d-flex gap-2 flex-wrap mb-2 mb-md-0">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search roadmaps..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ maxWidth: '250px' }}
                  />
                  
                  <select 
                    className="form-select" 
                    value={filterRole}
                    onChange={(e) => setFilterRole(e.target.value)}
                    style={{ maxWidth: '180px' }}
                  >
                    <option value="">All Roles</option>
                    {getRoles().map(role => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                  
                  <select 
                    className="form-select" 
                    value={filterLevel}
                    onChange={(e) => setFilterLevel(e.target.value)}
                    style={{ maxWidth: '180px' }}
                  >
                    <option value="">All Levels</option>
                    {getExperienceLevels().map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>
                
                {filterRole || filterLevel || searchTerm ? (
                  <Button 
                    variant="outline-secondary" 
                    size="sm"
                    onClick={() => {
                      setSearchTerm('');
                      setFilterRole('');
                      setFilterLevel('');
                    }}
                  >
                    Clear Filters
                  </Button>
                ) : null}
              </div>
              
              <Row className="g-4">
                {getFilteredRoadmaps(roadmaps).map((roadmap) => (
                  <Col md={6} lg={4} key={roadmap.id}>
                    <div 
                      className={`roadmap-list-item ${currentRoadmap?.id === roadmap.id ? 'active' : ''}`}
                    >
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <h4 
                          className="fw-bold mb-0 roadmap-title"
                          onClick={() => handleRoadmapSelect(roadmap.id)}
                        >
                          {roadmap.title}
                        </h4>
                        <Dropdown>
                          <Dropdown.Toggle variant="link" size="sm" className="no-arrow p-0">
                            <i className="fas fa-ellipsis-v text-muted"></i>
                          </Dropdown.Toggle>
                          <Dropdown.Menu align="end">
                            <Dropdown.Item onClick={() => handleRoadmapSelect(roadmap.id)}>
                              <FontAwesomeIcon icon={faEye} className="me-2" />
                              View Roadmap
                            </Dropdown.Item>
                            {currentUser && (
                              <Dropdown.Item 
                                onClick={() => handleTogglePublic(roadmap.id, roadmap.isPublic)}
                              >
                                <FontAwesomeIcon 
                                  icon={roadmap.isPublic ? faLock : faShare} 
                                  className="me-2" 
                                />
                                {roadmap.isPublic ? 'Make Private' : 'Make Public'}
                              </Dropdown.Item>
                            )}
                            <Dropdown.Divider />
                            <Dropdown.Item 
                              className="text-danger"
                              onClick={(e) => handleDeleteRoadmap(roadmap.id, e)}
                            >
                              <i className="fas fa-trash-alt me-2"></i>
                              Delete Roadmap
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                      
                      <p 
                        className="text-muted mb-3 roadmap-description"
                        onClick={() => handleRoadmapSelect(roadmap.id)}
                      >
                        {roadmap.description}
                      </p>
                      
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <Badge bg="primary" className="me-2 px-3 py-2">{roadmap.role}</Badge>
                          <Badge bg="secondary" className="px-3 py-2">{roadmap.experienceLevel}</Badge>
                          {roadmap.isPublic && (
                            <Badge bg="success" className="ms-2 px-3 py-2">
                              <FontAwesomeIcon icon={faGlobe} className="me-1" />
                              Public
                            </Badge>
                          )}
                          {roadmap.isCustomized && (
                            <Badge bg="info" className="ms-2 px-3 py-2">
                              Customized
                            </Badge>
                          )}
                        </div>
                        <small className="text-muted">
                          {new Date(roadmap.createdAt).toLocaleDateString()}
                        </small>
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            </>
          )}
        </Tab>
        
        <Tab eventKey="public-roadmaps" title={
          <span>
            <FontAwesomeIcon icon={faGlobe} className="me-2" />
            Public Roadmaps
          </span>
        }>
          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
              <p className="mt-3">Loading public roadmaps...</p>
            </div>
          ) : publicRoadmaps.length === 0 ? (
            <div className="text-center py-5">
              <img 
                src="https://cdn-icons-png.flaticon.com/512/6598/6598519.png" 
                alt="No public roadmaps" 
                style={{ width: '150px', opacity: 0.5 }}
                className="mb-4"
              />
              <h3 className="mb-3">No public roadmaps available</h3>
              <p className="text-muted mb-4">
                Be the first to share a roadmap with the community!
              </p>
              {currentUser ? (
                <Button 
                  variant="primary" 
                  size="lg"
                  onClick={() => {
                    setShowGenerator(true);
                    setActiveTab('create');
                  }}
                >
                  <FontAwesomeIcon icon={faPlus} className="me-2" />
                  Create and Share a Roadmap
                </Button>
              ) : (
                <p>Sign in to create and share roadmaps with others.</p>
              )}
            </div>
          ) : (
            <>
              <div className="mb-4 d-flex justify-content-between align-items-center flex-wrap">
                <div className="search-filters d-flex gap-2 flex-wrap mb-2 mb-md-0">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search public roadmaps..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ maxWidth: '250px' }}
                  />
                  
                  <select 
                    className="form-select" 
                    value={filterRole}
                    onChange={(e) => setFilterRole(e.target.value)}
                    style={{ maxWidth: '180px' }}
                  >
                    <option value="">All Roles</option>
                    {getRoles().map(role => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                  
                  <select 
                    className="form-select" 
                    value={filterLevel}
                    onChange={(e) => setFilterLevel(e.target.value)}
                    style={{ maxWidth: '180px' }}
                  >
                    <option value="">All Levels</option>
                    {getExperienceLevels().map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>
                
                {filterRole || filterLevel || searchTerm ? (
                  <Button 
                    variant="outline-secondary" 
                    size="sm"
                    onClick={() => {
                      setSearchTerm('');
                      setFilterRole('');
                      setFilterLevel('');
                    }}
                  >
                    Clear Filters
                  </Button>
                ) : null}
              </div>
              
              <Row className="g-4">
                {getFilteredRoadmaps(publicRoadmaps).map((roadmap) => (
                  <Col md={6} lg={4} key={roadmap.id}>
                    <div className="roadmap-list-item public-roadmap">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <h4 className="fw-bold mb-0">{roadmap.title}</h4>
                        <Badge bg="success" className="px-3 py-2">
                          <FontAwesomeIcon icon={faGlobe} className="me-1" />
                          Public
                        </Badge>
                      </div>
                      
                      <p className="text-muted mb-3">{roadmap.description}</p>
                      
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <div>
                          <Badge bg="primary" className="me-2 px-3 py-2">{roadmap.role}</Badge>
                          <Badge bg="secondary" className="px-3 py-2">{roadmap.experienceLevel}</Badge>
                        </div>
                        <small className="text-muted">
                          {new Date(roadmap.createdAt).toLocaleDateString()}
                        </small>
                      </div>
                      
                      <div className="d-flex justify-content-between">
                        <Button 
                          variant="outline-primary" 
                          size="sm"
                          onClick={() => {
                            selectRoadmap(roadmap.id);
                            setActiveTab('visualize');
                          }}
                        >
                          <FontAwesomeIcon icon={faEye} className="me-2" />
                          View Roadmap
                        </Button>
                        
                        {currentUser && (
                          <Button 
                            variant="outline-success" 
                            size="sm"
                            onClick={() => {
                              // Create a copy of this roadmap for the user
                              const customizedRoadmap = {
                                ...roadmap,
                                id: `roadmap-${Date.now()}`,
                                createdAt: new Date().toISOString(),
                                userId: currentUser.id,
                                isCustomized: true,
                                originalRoadmapId: roadmap.id,
                                isPublic: false
                              };
                              
                              saveRoadmap(customizedRoadmap);
                              selectRoadmap(customizedRoadmap.id);
                              setActiveTab('visualize');
                            }}
                          >
                            <FontAwesomeIcon icon={faPlus} className="me-2" />
                            Add to My Roadmaps
                          </Button>
                        )}
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            </>
          )}
        </Tab>
        
        <Tab eventKey="visualize" title={
          <span>
            <FontAwesomeIcon icon={faEye} className="me-2" />
            Visualize Roadmap
          </span>
        }>
          <RoadmapVisualizer roadmap={currentRoadmap} />
        </Tab>
        
        <Tab eventKey="create" title={
          <span>
            <FontAwesomeIcon icon={faPlus} className="me-2" />
            Create New
          </span>
        }>
          {showGenerator && <RoadmapGenerator onRoadmapGenerated={handleRoadmapGenerated} />}
        </Tab>
      </Tabs>
    </Container>
  );
};

export default RoadmapPage;