import {
    faArrowLeft,
    faBookmark,
    faBriefcase,
    faBuilding,
    faCalendarAlt,
    faCheckCircle,
    faClock,
    faDollarSign,
    faExternalLinkAlt,
    faGraduationCap,
    faListUl,
    faMapMarkerAlt
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Alert, Badge, Button, Card, Col, Container, Row, Spinner } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { getJobDetails } from '../../services/jobService';
import './Jobs.css';

const JobDetail = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saved, setSaved] = useState(false);
  
  useEffect(() => {
    loadJobDetails();
    
    // Check if job is saved
    const savedJobs = JSON.parse(localStorage.getItem('savedJobs') || '[]');
    setSaved(savedJobs.includes(id));
  }, [id]);
  
  const loadJobDetails = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // In a real app, we would fetch the job from the API
      // For demo purposes, we'll use the getJobDetails function
      const jobData = await getJobDetails({
        id,
        title: localStorage.getItem(`job_${id}_title`) || 'Software Engineer',
        company: localStorage.getItem(`job_${id}_company`) || 'Tech Company',
        location: localStorage.getItem(`job_${id}_location`) || 'San Francisco, CA',
        type: localStorage.getItem(`job_${id}_type`) || 'Full-time'
      });
      
      setJob(jobData);
    } catch (err) {
      console.error('Error loading job details:', err);
      setError('Failed to load job details. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  
  const toggleSaveJob = () => {
    const savedJobs = JSON.parse(localStorage.getItem('savedJobs') || '[]');
    let updatedSavedJobs;
    
    if (savedJobs.includes(id)) {
      updatedSavedJobs = savedJobs.filter(jobId => jobId !== id);
      setSaved(false);
    } else {
      updatedSavedJobs = [...savedJobs, id];
      setSaved(true);
      
      // Save job details for later retrieval
      localStorage.setItem(`job_${id}_title`, job.title);
      localStorage.setItem(`job_${id}_company`, job.company);
      localStorage.setItem(`job_${id}_location`, job.location);
      localStorage.setItem(`job_${id}_type`, job.type);
    }
    
    localStorage.setItem('savedJobs', JSON.stringify(updatedSavedJobs));
  };
  
  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" role="status" className="mb-3">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p>Loading job details...</p>
      </Container>
    );
  }
  
  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">
          {error}
          <Button 
            variant="outline-danger" 
            size="sm" 
            className="ms-3"
            onClick={loadJobDetails}
          >
            Try Again
          </Button>
        </Alert>
        <Link to="/jobs" className="btn btn-primary">
          <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
          Back to Jobs
        </Link>
      </Container>
    );
  }
  
  if (!job) {
    return (
      <Container className="py-5">
        <Card className="text-center py-5 shadow-sm border-0">
          <Card.Body>
            <h3>Job Not Found</h3>
            <p className="text-muted">The job you're looking for doesn't exist or has been removed.</p>
            <Link to="/jobs" className="btn btn-primary mt-3">
              <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
              Back to Jobs
            </Link>
          </Card.Body>
        </Card>
      </Container>
    );
  }
  
  return (
    <Container className="py-5">
      <Link to="/jobs" className="btn btn-outline-primary mb-4">
        <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
        Back to Jobs
      </Link>
      
      <div className="job-detail-header mb-4">
        <Row>
          <Col md={8}>
            <div className="d-flex">
              <img 
                src={job.logo || `https://logo.clearbit.com/${job.company.toLowerCase().replace(/[^a-zA-Z0-9]/g, '')}.com`} 
                alt={job.company} 
                className="job-detail-company-logo me-3"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/80?text=' + job.company.charAt(0);
                }}
              />
              <div>
                <h2 className="mb-1 fw-bold">{job.title}</h2>
                <h5 className="mb-3 text-white-50">{job.company}</h5>
                
                <div className="d-flex flex-wrap">
                  <Badge bg="light" text="dark" className="me-2 mb-2 px-3 py-2">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2" />
                    {job.location}
                  </Badge>
                  <Badge bg="light" text="dark" className="me-2 mb-2 px-3 py-2">
                    <FontAwesomeIcon icon={faClock} className="me-2" />
                    {job.type}
                  </Badge>
                  {job.salary && (
                    <Badge bg="light" text="dark" className="me-2 mb-2 px-3 py-2">
                      <FontAwesomeIcon icon={faDollarSign} className="me-2" />
                      {job.salary}
                    </Badge>
                  )}
                  <Badge bg="light" text="dark" className="me-2 mb-2 px-3 py-2">
                    <FontAwesomeIcon icon={faCalendarAlt} className="me-2" />
                    {job.postedDate}
                  </Badge>
                </div>
              </div>
            </div>
          </Col>
          <Col md={4} className="d-flex justify-content-end align-items-start">
            <div>
              <Button 
                variant={saved ? "warning" : "light"} 
                className="me-2"
                onClick={toggleSaveJob}
              >
                <FontAwesomeIcon icon={faBookmark} className="me-2" />
                {saved ? 'Saved' : 'Save Job'}
              </Button>
              <a 
                href={job.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-light"
              >
                <FontAwesomeIcon icon={faExternalLinkAlt} className="me-2" />
                Apply Now
              </a>
            </div>
          </Col>
        </Row>
      </div>
      
      <Row>
        <Col lg={8}>
          <Card className="mb-4 shadow-sm border-0">
            <Card.Body className="p-4">
              <div className="job-detail-section">
                <h3>
                  <FontAwesomeIcon icon={faBriefcase} className="me-2" />
                  Job Description
                </h3>
                <div dangerouslySetInnerHTML={{ __html: job.fullDescription }} />
              </div>
              
              <div className="job-detail-section">
                <h3>
                  <FontAwesomeIcon icon={faListUl} className="me-2" />
                  Responsibilities
                </h3>
                <ul className="job-detail-list">
                  {job.responsibilities && job.responsibilities.map((responsibility, index) => (
                    <li key={index}>{responsibility}</li>
                  ))}
                </ul>
              </div>
              
              <div className="job-detail-section">
                <h3>
                  <FontAwesomeIcon icon={faGraduationCap} className="me-2" />
                  Qualifications
                </h3>
                
                <h5 className="mt-4">Required Skills</h5>
                <ul className="job-detail-list">
                  {job.qualifications && job.qualifications.required && job.qualifications.required.map((qualification, index) => (
                    <li key={index}>{qualification}</li>
                  ))}
                </ul>
                
                {job.qualifications && job.qualifications.preferred && job.qualifications.preferred.length > 0 && (
                  <>
                    <h5 className="mt-4">Preferred Skills</h5>
                    <ul className="job-detail-list">
                      {job.qualifications.preferred.map((qualification, index) => (
                        <li key={index}>{qualification}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
              
              {job.benefits && job.benefits.length > 0 && (
                <div className="job-detail-section">
                  <h3>
                    <FontAwesomeIcon icon={faCheckCircle} className="me-2" />
                    Benefits
                  </h3>
                  <ul className="job-detail-list">
                    {job.benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div className="mt-5 text-center">
                <a 
                  href={job.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-primary btn-lg job-apply-button"
                >
                  <FontAwesomeIcon icon={faExternalLinkAlt} className="me-2" />
                  Apply for this Position
                </a>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col lg={4}>
          <Card className="mb-4 shadow-sm border-0">
            <Card.Body className="p-4">
              <h3 className="mb-4">
                <FontAwesomeIcon icon={faBuilding} className="me-2" />
                Company Information
              </h3>
              
              {job.companyInfo && (
                <>
                  <div className="d-flex align-items-center mb-3">
                    <img 
                      src={job.logo || `https://logo.clearbit.com/${job.company.toLowerCase().replace(/[^a-zA-Z0-9]/g, '')}.com`} 
                      alt={job.company} 
                      className="job-logo me-3"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/50?text=' + job.company.charAt(0);
                      }}
                    />
                    <h5 className="mb-0">{job.company}</h5>
                  </div>
                  
                  <p className="mb-4">{job.companyInfo.description}</p>
                  
                  <div className="mb-3">
                    <strong>Industry:</strong> {job.companyInfo.industry}
                  </div>
                  
                  <div className="mb-3">
                    <strong>Company Size:</strong> {job.companyInfo.size}
                  </div>
                  
                  {job.companyInfo.founded && (
                    <div className="mb-3">
                      <strong>Founded:</strong> {job.companyInfo.founded}
                    </div>
                  )}
                  
                  {job.companyInfo.website && (
                    <div className="mb-4">
                      <strong>Website:</strong>{' '}
                      <a 
                        href={job.companyInfo.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        {job.companyInfo.website.replace(/^https?:\/\/(www\.)?/, '')}
                      </a>
                    </div>
                  )}
                </>
              )}
              
              <a 
                href={`https://www.google.com/search?q=${encodeURIComponent(job.company)}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-outline-primary w-100"
              >
                <FontAwesomeIcon icon={faBuilding} className="me-2" />
                Learn More About {job.company}
              </a>
            </Card.Body>
          </Card>
          
          {job.applicationTips && (
            <Card className="mb-4 shadow-sm border-0">
              <Card.Body className="p-4">
                <h3 className="mb-4">Application Tips</h3>
                <p>{job.applicationTips}</p>
              </Card.Body>
            </Card>
          )}
          
          {job.similarRoles && job.similarRoles.length > 0 && (
            <Card className="shadow-sm border-0">
              <Card.Body className="p-4">
                <h3 className="mb-4">Similar Roles to Explore</h3>
                <ul className="job-detail-list">
                  {job.similarRoles.map((role, index) => (
                    <li key={index}>
                      <Link to={`/jobs?role=${encodeURIComponent(role)}`}>
                        {role}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default JobDetail;