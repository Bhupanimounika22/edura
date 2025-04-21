import {
  faBookmark,
  faBriefcase,
  faBuilding,
  faCalendarAlt,
  faChartLine,
  faClock,
  faComments,
  faDollarSign,
  faFileAlt,
  faGraduationCap,
  faHandshake,
  faLaptopCode,
  faLightbulb,
  faMapMarkerAlt,
  faRocket,
  faSearch,
  faStar,
  faTools,
  faUserTie
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Alert, Badge, Button, Card, Col, Container, Form, InputGroup, Modal, Nav, Row, Spinner, Tab, Tabs } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { fetchJobs } from '../../services/jobService';
import './Jobs.css';

const Jobs = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [allJobs, setAllJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [savedJobs, setSavedJobs] = useState([]);
  const [showAdvisor, setShowAdvisor] = useState(false);
  const [advisorTab, setAdvisorTab] = useState('resume');
  const [careerPath, setCareerPath] = useState('');
  const [filters, setFilters] = useState({
    role: '',
    location: '',
    remote: false,
    type: '',
    experience: '',
    source: ''
  });
  
  // Popular job roles for quick filtering
  const popularRoles = [
    'Software Engineer',
    'Data Scientist',
    'Product Manager',
    'UX Designer',
    'DevOps Engineer',
    'Frontend Developer',
    'Backend Developer',
    'Full Stack Developer',
    'Machine Learning Engineer'
  ];
  
  // Popular locations for quick filtering
  const popularLocations = [
    'Remote',
    'San Francisco',
    'New York',
    'Seattle',
    'Austin',
    'Boston',
    'London',
    'Berlin',
    'Toronto'
  ];
  
  // Job sources for filtering
  const jobSources = [
    'LinkedIn',
    'Indeed',
    'Glassdoor',
    'AngelList',
    'Hired',
    'Stack Overflow'
  ];
  
  useEffect(() => {
    loadJobs();
    
    // Load saved jobs from localStorage
    const savedJobsFromStorage = JSON.parse(localStorage.getItem('savedJobs') || '[]');
    setSavedJobs(savedJobsFromStorage);
  }, []);
  
  const loadJobs = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const jobsData = await fetchJobs();
      
      if (Array.isArray(jobsData) && jobsData.length > 0) {
        setAllJobs(jobsData);
        setFilteredJobs(jobsData);
      } else {
        // If no jobs returned or invalid response
        setError('No jobs found. Please try again later.');
        
        // Set some sample jobs as fallback
        const sampleJobs = getSampleJobs();
        setAllJobs(sampleJobs);
        setFilteredJobs(sampleJobs);
      }
    } catch (err) {
      console.error('Error loading jobs:', err);
      setError('Failed to load jobs. Please try again later.');
      
      // Set some sample jobs as fallback
      const sampleJobs = getSampleJobs();
      setAllJobs(sampleJobs);
      setFilteredJobs(sampleJobs);
    } finally {
      setLoading(false);
    }
  };
  
  // Fallback sample jobs in case the API fails
  const getSampleJobs = () => {
    return [
      {
        id: "job-1",
        title: "Senior Software Engineer",
        company: "TechCorp",
        location: "San Francisco, CA",
        type: "Full-time",
        salary: "$120,000 - $150,000",
        description: "We're looking for a Senior Software Engineer to join our team and help build scalable web applications.",
        requirements: ["5+ years of experience", "JavaScript", "React", "Node.js"],
        postedDate: "2 days ago",
        url: "https://www.linkedin.com/jobs/view/senior-software-engineer-at-techcorp",
        source: "LinkedIn",
        logo: "https://logo.clearbit.com/techcorp.com"
      },
      {
        id: "job-2",
        title: "Data Scientist",
        company: "DataInsights",
        location: "Remote",
        type: "Full-time",
        salary: "$110,000 - $140,000",
        description: "Join our data science team to build machine learning models and extract insights from large datasets.",
        requirements: ["Python", "Machine Learning", "SQL", "Data Visualization"],
        postedDate: "1 day ago",
        url: "https://www.indeed.com/jobs?q=data+scientist&l=remote",
        source: "Indeed",
        logo: "https://logo.clearbit.com/datainsights.com"
      },
      {
        id: "job-3",
        title: "UX/UI Designer",
        company: "DesignHub",
        location: "New York, NY",
        type: "Full-time",
        salary: "$90,000 - $120,000",
        description: "We're seeking a talented UX/UI Designer to create beautiful, intuitive interfaces for our products.",
        requirements: ["Figma", "Adobe Creative Suite", "User Research", "Prototyping"],
        postedDate: "3 days ago",
        url: "https://www.glassdoor.com/Job/new-york-ux-ui-designer-jobs-SRCH_IL.0,8_IC1132348_KO9,23.htm",
        source: "Glassdoor",
        logo: "https://logo.clearbit.com/designhub.com"
      },
      {
        id: "job-4",
        title: "Frontend Developer Intern",
        company: "WebTech",
        location: "Boston, MA",
        type: "Internship",
        salary: "$25 - $30 per hour",
        description: "Great opportunity for students to gain real-world experience building modern web applications.",
        requirements: ["HTML/CSS", "JavaScript", "React basics", "Currently enrolled in CS program"],
        postedDate: "5 days ago",
        url: "https://www.linkedin.com/jobs/search/?keywords=frontend%20developer%20intern&location=Boston%2C%20Massachusetts%2C%20United%20States",
        source: "LinkedIn",
        logo: "https://logo.clearbit.com/webtech.com"
      },
      {
        id: "job-5",
        title: "DevOps Engineer",
        company: "CloudSystems",
        location: "Seattle, WA",
        type: "Full-time",
        salary: "$130,000 - $160,000",
        description: "Help us build and maintain our cloud infrastructure and deployment pipelines.",
        requirements: ["AWS", "Docker", "Kubernetes", "CI/CD", "Linux"],
        postedDate: "1 week ago",
        url: "https://angel.co/jobs/search?job_listing_id=2594106",
        source: "AngelList",
        logo: "https://logo.clearbit.com/cloudsystems.com"
      },
      {
        id: "job-6",
        title: "Product Manager",
        company: "ProductLabs",
        location: "Austin, TX",
        type: "Full-time",
        salary: "$115,000 - $145,000",
        description: "Lead product development from conception to launch, working with cross-functional teams.",
        requirements: ["3+ years in product management", "Agile methodologies", "User-centered design", "Data analysis"],
        postedDate: "4 days ago",
        url: "https://www.indeed.com/jobs?q=product+manager&l=Austin%2C+TX",
        source: "Indeed",
        logo: "https://logo.clearbit.com/productlabs.com"
      }
    ];
  };
  
  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters({
      ...filters,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const applyFilters = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // If we have specific filters, fetch new jobs with those filters
      if (filters.role || filters.location || filters.type || filters.experience) {
        const jobsData = await fetchJobs(filters);
        
        if (Array.isArray(jobsData) && jobsData.length > 0) {
          setAllJobs(jobsData);
          setFilteredJobs(jobsData);
        } else {
          // If no jobs found, keep the current jobs but filter them
          setFilteredJobs([]);
        }
      } else {
        // Otherwise, filter the existing jobs
        filterExistingJobs();
      }
    } catch (err) {
      console.error('Error applying filters:', err);
      setError('Failed to apply filters. Please try again later.');
      
      // Keep the current jobs displayed even if there's an error
      filterExistingJobs();
    } finally {
      setLoading(false);
    }
  };
  
  const filterExistingJobs = () => {
    const filtered = allJobs.filter(job => {
      // Source filter
      if (filters.source && job.source !== filters.source) {
        return false;
      }
      
      // Type filter (for internships tab)
      if (activeTab === 'internships' && job.type.toLowerCase() !== 'internship') {
        return false;
      }
      
      return true;
    });
    
    setFilteredJobs(filtered);
  };
  
  const resetFilters = () => {
    setFilters({
      role: '',
      location: '',
      remote: false,
      type: '',
      experience: '',
      source: ''
    });
    
    setFilteredJobs(allJobs);
  };
  
  const toggleSaveJob = (jobId) => {
    let updatedSavedJobs;
    
    if (savedJobs.includes(jobId)) {
      updatedSavedJobs = savedJobs.filter(id => id !== jobId);
    } else {
      updatedSavedJobs = [...savedJobs, jobId];
    }
    
    setSavedJobs(updatedSavedJobs);
    localStorage.setItem('savedJobs', JSON.stringify(updatedSavedJobs));
  };
  
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    
    if (tab === 'all') {
      setFilteredJobs(allJobs);
    } else if (tab === 'internships') {
      const internships = allJobs.filter(job => 
        job.type.toLowerCase() === 'internship'
      );
      setFilteredJobs(internships);
    } else if (tab === 'saved') {
      const saved = allJobs.filter(job => 
        savedJobs.includes(job.id)
      );
      setFilteredJobs(saved);
    }
  };
  
  const handleQuickFilterClick = (filterType, value) => {
    // If clicking on the already active filter, clear it
    const newValue = filters[filterType] === value ? '' : value;
    const newFilters = { ...filters, [filterType]: newValue };
    setFilters(newFilters);
    
    // Apply the filter immediately
    setLoading(true);
    setError(null);
    
    setTimeout(async () => {
      try {
        // Only fetch new jobs if we have filters
        if (newValue) {
          const jobsData = await fetchJobs(newFilters);
          
          if (Array.isArray(jobsData) && jobsData.length > 0) {
            setAllJobs(jobsData);
            setFilteredJobs(jobsData);
          } else {
            // If no jobs found, show empty state
            setFilteredJobs([]);
          }
        } else {
          // If filter was cleared, reload all jobs
          const jobsData = await fetchJobs();
          setAllJobs(jobsData);
          setFilteredJobs(jobsData);
        }
      } catch (err) {
        console.error('Error applying quick filter:', err);
        setError('Failed to apply filter. Please try again later.');
        
        // Keep showing current jobs
        if (allJobs.length > 0) {
          filterExistingJobs();
        }
      } finally {
        setLoading(false);
      }
    }, 300);
  };
  
  // Career paths for the advisor
  const careerPaths = [
    { 
      name: 'Software Development', 
      icon: faLaptopCode,
      description: 'Build applications, websites, and software systems',
      roles: ['Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'Mobile Developer']
    },
    { 
      name: 'Data Science', 
      icon: faChartLine,
      description: 'Analyze data and build machine learning models',
      roles: ['Data Analyst', 'Data Scientist', 'Machine Learning Engineer', 'AI Researcher']
    },
    { 
      name: 'Design', 
      icon: faStar,
      description: 'Create beautiful and functional user experiences',
      roles: ['UX Designer', 'UI Designer', 'Product Designer', 'Graphic Designer']
    },
    { 
      name: 'Product Management', 
      icon: faRocket,
      description: 'Lead product development from concept to launch',
      roles: ['Product Manager', 'Product Owner', 'Program Manager', 'Technical Product Manager']
    },
    { 
      name: 'DevOps & Infrastructure', 
      icon: faTools,
      description: 'Build and maintain technical infrastructure',
      roles: ['DevOps Engineer', 'Site Reliability Engineer', 'Cloud Engineer', 'Infrastructure Engineer']
    }
  ];
  
  // Resume tips for the advisor
  const resumeTips = [
    {
      title: 'Tailor your resume to each job',
      description: 'Customize your resume for each position by highlighting relevant skills and experiences that match the job description.',
      icon: faFileAlt
    },
    {
      title: 'Quantify your achievements',
      description: 'Use numbers and metrics to demonstrate your impact, such as "Increased conversion rate by 25%" or "Managed a team of 8 developers".',
      icon: faChartLine
    },
    {
      title: 'Keep it concise',
      description: 'Limit your resume to 1-2 pages, focusing on your most relevant and recent experiences.',
      icon: faLightbulb
    },
    {
      title: 'Use action verbs',
      description: 'Start bullet points with strong action verbs like "Developed," "Implemented," or "Led" to make your accomplishments stand out.',
      icon: faRocket
    },
    {
      title: 'Include relevant keywords',
      description: 'Many companies use Applicant Tracking Systems (ATS) to screen resumes, so include industry-specific keywords from the job description.',
      icon: faSearch
    }
  ];
  
  // Interview tips for the advisor
  const interviewTips = [
    {
      title: 'Research the company',
      description: 'Learn about the company\'s products, culture, and recent news to demonstrate your interest and preparation.',
      icon: faSearch
    },
    {
      title: 'Prepare for common questions',
      description: 'Practice answers to common questions like "Tell me about yourself" and "Why do you want to work here?"',
      icon: faComments
    },
    {
      title: 'Use the STAR method',
      description: 'Structure your answers to behavioral questions using the Situation, Task, Action, Result format to clearly demonstrate your skills.',
      icon: faStar
    },
    {
      title: 'Prepare thoughtful questions',
      description: 'Have 3-5 insightful questions ready to ask the interviewer about the role, team, or company.',
      icon: faLightbulb
    },
    {
      title: 'Follow up after the interview',
      description: 'Send a thank-you email within 24 hours to express your appreciation and reiterate your interest in the position.',
      icon: faHandshake
    }
  ];
  
  // Function to get career advice based on selected path
  const getCareerAdvice = (path) => {
    const selectedPath = careerPaths.find(p => p.name === path);
    if (!selectedPath) return null;
    
    return (
      <div className="career-advice">
        <h4 className="mb-4">
          <FontAwesomeIcon icon={selectedPath.icon} className="me-2" />
          {selectedPath.name} Career Path
        </h4>
        
        <p className="mb-4">{selectedPath.description}</p>
        
        <h5 className="mb-3">Common Roles:</h5>
        <ul className="career-roles-list">
          {selectedPath.roles.map((role, index) => (
            <li key={index} className="mb-2">
              <Button 
                variant="outline-primary" 
                size="sm" 
                className="me-2"
                onClick={() => {
                  setFilters({...filters, role: role});
                  setShowAdvisor(false);
                  setTimeout(() => applyFilters(), 300);
                }}
              >
                <FontAwesomeIcon icon={faSearch} className="me-1" />
              </Button>
              {role}
            </li>
          ))}
        </ul>
        
        <h5 className="mt-4 mb-3">Skills to Develop:</h5>
        <div className="d-flex flex-wrap">
          {getSkillsForPath(path).map((skill, index) => (
            <Badge 
              key={index} 
              bg="light" 
              text="dark" 
              className="me-2 mb-2 p-2"
            >
              {skill}
            </Badge>
          ))}
        </div>
        
        <h5 className="mt-4 mb-3">Learning Resources:</h5>
        <ul className="career-resources-list">
          {getResourcesForPath(path).map((resource, index) => (
            <li key={index} className="mb-2">
              <a href={resource.url} target="_blank" rel="noopener noreferrer">
                {resource.name}
              </a>
              {' - '}{resource.description}
            </li>
          ))}
        </ul>
        
        <div className="mt-4 text-center">
          <Button 
            variant="primary" 
            onClick={() => {
              setFilters({...filters, role: selectedPath.roles[0]});
              setShowAdvisor(false);
              setTimeout(() => applyFilters(), 300);
            }}
          >
            <FontAwesomeIcon icon={faSearch} className="me-2" />
            Find {selectedPath.name} Jobs
          </Button>
        </div>
      </div>
    );
  };
  
  // Helper function to get skills for a career path
  const getSkillsForPath = (path) => {
    switch(path) {
      case 'Software Development':
        return ['JavaScript', 'React', 'Node.js', 'Python', 'Git', 'REST APIs', 'SQL', 'Problem Solving'];
      case 'Data Science':
        return ['Python', 'R', 'SQL', 'Machine Learning', 'Statistics', 'Data Visualization', 'TensorFlow', 'PyTorch'];
      case 'Design':
        return ['Figma', 'Adobe Creative Suite', 'UI/UX Principles', 'Wireframing', 'Prototyping', 'User Research', 'Visual Design'];
      case 'Product Management':
        return ['Agile Methodologies', 'User Stories', 'Roadmapping', 'Stakeholder Management', 'Data Analysis', 'Market Research', 'A/B Testing'];
      case 'DevOps & Infrastructure':
        return ['Docker', 'Kubernetes', 'AWS/Azure/GCP', 'CI/CD', 'Linux', 'Terraform', 'Monitoring', 'Security'];
      default:
        return [];
    }
  };
  
  // Helper function to get resources for a career path
  const getResourcesForPath = (path) => {
    switch(path) {
      case 'Software Development':
        return [
          { name: 'freeCodeCamp', url: 'https://www.freecodecamp.org/', description: 'Free coding tutorials and projects' },
          { name: 'The Odin Project', url: 'https://www.theodinproject.com/', description: 'Full-stack curriculum' },
          { name: 'MDN Web Docs', url: 'https://developer.mozilla.org/', description: 'Web development documentation' }
        ];
      case 'Data Science':
        return [
          { name: 'Kaggle', url: 'https://www.kaggle.com/', description: 'Data science competitions and courses' },
          { name: 'DataCamp', url: 'https://www.datacamp.com/', description: 'Interactive data science courses' },
          { name: 'Towards Data Science', url: 'https://towardsdatascience.com/', description: 'Data science articles and tutorials' }
        ];
      case 'Design':
        return [
          { name: 'Dribbble', url: 'https://dribbble.com/', description: 'Design inspiration and community' },
          { name: 'NN/g', url: 'https://www.nngroup.com/', description: 'UX research and guidelines' },
          { name: 'Figma Tutorials', url: 'https://www.figma.com/resources/learn-design/', description: 'Official Figma design tutorials' }
        ];
      case 'Product Management':
        return [
          { name: 'Product School', url: 'https://www.productschool.com/free-product-management-resources/', description: 'Free PM resources' },
          { name: 'Mind the Product', url: 'https://www.mindtheproduct.com/', description: 'PM community and articles' },
          { name: 'Product Plan', url: 'https://www.productplan.com/learn/', description: 'Product management guides' }
        ];
      case 'DevOps & Infrastructure':
        return [
          { name: 'DevOps Roadmap', url: 'https://roadmap.sh/devops', description: 'DevOps learning path' },
          { name: 'Kubernetes Documentation', url: 'https://kubernetes.io/docs/home/', description: 'Official Kubernetes docs' },
          { name: 'AWS Training', url: 'https://aws.amazon.com/training/', description: 'Free AWS training and resources' }
        ];
      default:
        return [];
    }
  };

  return (
    <Container className="py-5 jobs-container">
      <Row className="mb-4">
        <Col md={8}>
          <h1 className="mb-0">Job Opportunities</h1>
          <p className="text-muted">Find your dream job in tech</p>
        </Col>
        <Col md={4} className="d-flex justify-content-end align-items-center">
          <Button 
            variant="primary" 
            className="career-advisor-btn"
            onClick={() => setShowAdvisor(true)}
          >
            <FontAwesomeIcon icon={faUserTie} className="me-2" />
            Career Advisor
          </Button>
        </Col>
      </Row>
      
      {error && (
        <Alert variant="danger" className="mb-4">
          {error}
          <Button 
            variant="outline-danger" 
            size="sm" 
            className="ms-3"
            onClick={loadJobs}
          >
            Try Again
          </Button>
        </Alert>
      )}
      
      {/* Search and Filter Section */}
      <Card className="mb-4 shadow-sm border-0">
        <Card.Body className="p-4 job-filters">
          <Row>
            <Col lg={5} className="mb-3 mb-lg-0">
              <Form.Label>Job Title / Role</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <FontAwesomeIcon icon={faBriefcase} />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="e.g. Software Engineer, Data Scientist"
                  name="role"
                  value={filters.role}
                  onChange={handleFilterChange}
                  className="job-search-input"
                />
              </InputGroup>
            </Col>
            <Col lg={5} className="mb-3 mb-lg-0">
              <Form.Label>Location</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <FontAwesomeIcon icon={faMapMarkerAlt} />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="e.g. San Francisco, Remote"
                  name="location"
                  value={filters.location}
                  onChange={handleFilterChange}
                  className="job-search-input"
                />
              </InputGroup>
            </Col>
            <Col lg={2} className="d-flex align-items-end">
              <Button 
                variant="primary" 
                className="w-100 job-search-button" 
                onClick={applyFilters}
                disabled={loading}
              >
                {loading ? (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="me-2"
                  />
                ) : (
                  <FontAwesomeIcon icon={faSearch} className="me-2" />
                )}
                Search
              </Button>
            </Col>
          </Row>
          
          <div className="mt-4">
            <h6 className="mb-2">Popular Roles</h6>
            <div className="d-flex flex-wrap">
              {popularRoles.map((role, index) => (
                <span 
                  key={index} 
                  className={`job-filter-tag ${filters.role === role ? 'active' : ''}`}
                  onClick={() => handleQuickFilterClick('role', role)}
                >
                  {role}
                </span>
              ))}
            </div>
          </div>
          
          <div className="mt-3">
            <h6 className="mb-2">Popular Locations</h6>
            <div className="d-flex flex-wrap">
              {popularLocations.map((location, index) => (
                <span 
                  key={index} 
                  className={`job-filter-tag ${filters.location === location ? 'active' : ''}`}
                  onClick={() => handleQuickFilterClick('location', location)}
                >
                  {location}
                </span>
              ))}
            </div>
          </div>
          
          <div className="mt-3">
            <Form.Check
              type="checkbox"
              id="remote-check"
              label="Remote only"
              name="remote"
              checked={filters.remote}
              onChange={handleFilterChange}
              className="d-inline-block me-3"
            />
            
            <Form.Select 
              name="type"
              value={filters.type}
              onChange={handleFilterChange}
              className="d-inline-block me-3"
              style={{ width: 'auto' }}
            >
              <option value="">Job Type</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </Form.Select>
            
            <Form.Select 
              name="experience"
              value={filters.experience}
              onChange={handleFilterChange}
              className="d-inline-block me-3"
              style={{ width: 'auto' }}
            >
              <option value="">Experience Level</option>
              <option value="Entry Level">Entry Level</option>
              <option value="Mid Level">Mid Level</option>
              <option value="Senior Level">Senior Level</option>
            </Form.Select>
            
            <Button variant="link" className="p-0" onClick={resetFilters}>
              Reset Filters
            </Button>
          </div>
        </Card.Body>
      </Card>
      
      {/* Tabs */}
      <div className="job-tabs-container mb-4">
        <Nav variant="pills" className="job-tabs">
          <Nav.Item>
            <Nav.Link 
              active={activeTab === 'all'} 
              onClick={() => handleTabChange('all')}
              className="px-4"
            >
              <FontAwesomeIcon icon={faBriefcase} className="me-2" />
              All Jobs
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link 
              active={activeTab === 'internships'} 
              onClick={() => handleTabChange('internships')}
              className="px-4"
            >
              <FontAwesomeIcon icon={faGraduationCap} className="me-2" />
              Internships
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link 
              active={activeTab === 'saved'} 
              onClick={() => handleTabChange('saved')}
              className="px-4"
            >
              <FontAwesomeIcon icon={faBookmark} className="me-2" />
              Saved
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </div>
      
      {/* Filter by source */}
      <Card className="mb-4 shadow-sm border-0 source-filter-card">
        <Card.Body className="p-3">
          <h6 className="mb-3">
            <FontAwesomeIcon icon={faBuilding} className="me-2 text-primary" />
            Filter by Source
          </h6>
          <div className="d-flex flex-wrap">
            {jobSources.map((source, index) => (
              <span 
                key={index} 
                className={`job-filter-tag ${filters.source === source ? 'active' : ''}`}
                onClick={() => {
                  setFilters({...filters, source: filters.source === source ? '' : source});
                  setTimeout(() => filterExistingJobs(), 100);
                }}
              >
                {source}
              </span>
            ))}
          </div>
        </Card.Body>
      </Card>
      
      {/* Jobs List */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="mb-0">
          {loading ? 'Searching for jobs...' : `${filteredJobs.length} Jobs Found`}
        </h4>
        <Form.Select className="w-auto">
          <option>Most Relevant</option>
          <option>Newest</option>
          <option>Highest Salary</option>
        </Form.Select>
      </div>
      
      {loading ? (
        <Row>
          {[1, 2, 3, 4, 5, 6].map((_, index) => (
            <Col lg={4} md={6} key={index} className="mb-4">
              <div className="job-skeleton shadow-sm">
                <div className="job-skeleton-header"></div>
                <div className="job-skeleton-body">
                  <div className="job-skeleton-line long"></div>
                  <div className="job-skeleton-line medium"></div>
                  <div className="job-skeleton-line short"></div>
                  <div className="job-skeleton-line medium"></div>
                  <div className="job-skeleton-line long"></div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      ) : filteredJobs.length === 0 ? (
        <Card className="text-center py-5 shadow-sm border-0">
          <Card.Body>
            <div className="no-jobs-found">
              <FontAwesomeIcon icon={faSearch} className="mb-3" />
              <h4>No jobs found</h4>
              <p className="text-muted">Try adjusting your search filters</p>
              <Button 
                variant="primary" 
                onClick={resetFilters}
                className="mt-2"
              >
                Reset Filters
              </Button>
            </div>
          </Card.Body>
        </Card>
      ) : (
        <Row>
          {filteredJobs.map(job => (
            <Col lg={4} md={6} key={job.id} className="mb-4">
              <Card className="job-card shadow-sm h-100">
                <div className="job-card-header">
                  <Badge 
                    bg="light" 
                    text="dark" 
                    className="job-source-badge"
                  >
                    {job.source}
                  </Badge>
                  
                  {job.featured && (
                    <Badge 
                      bg="warning" 
                      text="dark" 
                      className="job-featured-badge"
                    >
                      Featured
                    </Badge>
                  )}
                  
                  {job.isNew && (
                    <Badge 
                      bg="success" 
                      className="job-new-badge"
                    >
                      New
                    </Badge>
                  )}
                </div>
                
                <Card.Body className="p-4">
                  <div className="d-flex mb-3">
                    <div className="job-logo-container me-3">
                      <img 
                        src={job.logo || `https://logo.clearbit.com/${job.company.toLowerCase().replace(/[^a-zA-Z0-9]/g, '')}.com`} 
                        alt={job.company} 
                        className="job-logo"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://via.placeholder.com/50?text=' + job.company.charAt(0);
                        }}
                      />
                    </div>
                    <div>
                      <Link to={`/jobs/${job.id}`} className="text-decoration-none">
                        <h5 className="job-title">{job.title}</h5>
                      </Link>
                      <p className="job-company mb-0">{job.company}</p>
                    </div>
                  </div>
                  
                  <div className="job-meta mb-3">
                    <div className="job-meta-item">
                      <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2 text-primary" />
                      {job.location}
                    </div>
                    <div className="job-meta-item">
                      <FontAwesomeIcon icon={faClock} className="me-2 text-primary" />
                      {job.type}
                    </div>
                    {job.salary && (
                      <div className="job-meta-item">
                        <FontAwesomeIcon icon={faDollarSign} className="me-2 text-primary" />
                        {job.salary}
                      </div>
                    )}
                  </div>
                  
                  <p className="job-description mb-3">
                    {job.description.length > 120 
                      ? job.description.substring(0, 120) + '...' 
                      : job.description}
                  </p>
                  
                  {job.requirements && job.requirements.length > 0 && (
                    <div className="job-requirements mb-3">
                      {job.requirements.slice(0, 3).map((req, index) => (
                        <Badge 
                          key={index} 
                          bg="light" 
                          text="dark" 
                          className="me-2 mb-2 job-requirement-badge"
                        >
                          {req}
                        </Badge>
                      ))}
                      {job.requirements.length > 3 && (
                        <Badge bg="light" text="dark" className="job-requirement-badge">
                          +{job.requirements.length - 3} more
                        </Badge>
                      )}
                    </div>
                  )}
                  
                  <div className="job-card-footer d-flex justify-content-between align-items-center mt-auto">
                    <span className="job-posted-date">
                      <FontAwesomeIcon icon={faCalendarAlt} className="me-1 text-muted" />
                      {job.postedDate}
                    </span>
                    <div className="job-actions">
                      <Button 
                        variant={savedJobs.includes(job.id) ? "warning" : "outline-secondary"} 
                        size="sm"
                        className="me-2 save-job-btn"
                        onClick={() => toggleSaveJob(job.id)}
                      >
                        <FontAwesomeIcon icon={faBookmark} />
                      </Button>
                      <Link to={`/jobs/${job.id}`} className="btn btn-primary btn-sm view-job-btn">
                        View Details
                      </Link>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
      
      {/* Career Advisor Modal */}
      <Modal 
        show={showAdvisor} 
        onHide={() => setShowAdvisor(false)} 
        size="lg"
        centered
        className="career-advisor-modal"
      >
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title>
            <FontAwesomeIcon icon={faUserTie} className="me-2 text-primary" />
            Career Advisor
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="pt-0">
          <p className="text-muted mb-4">
            Get personalized career guidance, resume tips, and interview preparation advice
          </p>
          
          <Tabs
            activeKey={advisorTab}
            onSelect={(k) => setAdvisorTab(k)}
            className="mb-4 advisor-tabs"
          >
            <Tab eventKey="career" title={
              <span>
                <FontAwesomeIcon icon={faChartLine} className="me-2" />
                Career Paths
              </span>
            }>
              <div className="p-2">
                <h4 className="mb-4">Explore Career Paths</h4>
                
                <Row>
                  {careerPaths.map((path, index) => (
                    <Col md={6} key={index} className="mb-4">
                      <Card 
                        className={`career-path-card h-100 ${careerPath === path.name ? 'active' : ''}`}
                        onClick={() => setCareerPath(path.name)}
                      >
                        <Card.Body className="p-4">
                          <div className="d-flex align-items-center mb-3">
                            <div className="career-icon me-3">
                              <FontAwesomeIcon icon={path.icon} />
                            </div>
                            <h5 className="mb-0">{path.name}</h5>
                          </div>
                          <p className="mb-0">{path.description}</p>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
                
                {careerPath && (
                  <div className="mt-4 career-path-details">
                    {getCareerAdvice(careerPath)}
                  </div>
                )}
              </div>
            </Tab>
            
            <Tab eventKey="resume" title={
              <span>
                <FontAwesomeIcon icon={faFileAlt} className="me-2" />
                Resume Tips
              </span>
            }>
              <div className="p-2">
                <h4 className="mb-4">Resume Building Tips</h4>
                
                <Row>
                  {resumeTips.map((tip, index) => (
                    <Col md={6} key={index} className="mb-4">
                      <Card className="resume-tip-card h-100">
                        <Card.Body className="p-4">
                          <div className="d-flex align-items-center mb-3">
                            <div className="tip-icon me-3">
                              <FontAwesomeIcon icon={tip.icon} />
                            </div>
                            <h5 className="mb-0">{tip.title}</h5>
                          </div>
                          <p className="mb-0">{tip.description}</p>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
                
                <div className="mt-4 text-center">
                  <Button variant="primary" onClick={() => setAdvisorTab('career')}>
                    <FontAwesomeIcon icon={faChartLine} className="me-2" />
                    Explore Career Paths
                  </Button>
                </div>
              </div>
            </Tab>
            
            <Tab eventKey="interview" title={
              <span>
                <FontAwesomeIcon icon={faComments} className="me-2" />
                Interview Prep
              </span>
            }>
              <div className="p-2">
                <h4 className="mb-4">Interview Preparation Tips</h4>
                
                <Row>
                  {interviewTips.map((tip, index) => (
                    <Col md={6} key={index} className="mb-4">
                      <Card className="interview-tip-card h-100">
                        <Card.Body className="p-4">
                          <div className="d-flex align-items-center mb-3">
                            <div className="tip-icon me-3">
                              <FontAwesomeIcon icon={tip.icon} />
                            </div>
                            <h5 className="mb-0">{tip.title}</h5>
                          </div>
                          <p className="mb-0">{tip.description}</p>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
                
                <div className="mt-4 text-center">
                  <Button variant="primary" onClick={() => setShowAdvisor(false)}>
                    <FontAwesomeIcon icon={faSearch} className="me-2" />
                    Find Jobs
                  </Button>
                </div>
              </div>
            </Tab>
          </Tabs>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Jobs;