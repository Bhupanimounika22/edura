import {
  faBook,
  faBookmark,
  faChartBar,
  faCode,
  faDatabase,
  faExternalLinkAlt,
  faGraduationCap,
  faLaptopCode,
  faMobileAlt,
  faPalette,
  faSearch,
  faServer,
  faStar,
  faUsers
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Badge, Button, Card, Col, Container, Form, InputGroup, Row, Tab, Tabs } from 'react-bootstrap';
import './Resources.css';

const Resources = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    type: '',
    level: '',
    price: ''
  });
  
  useEffect(() => {
    // In a real app, you would fetch resources from an API
    // For demo purposes, we'll use mock data
    setTimeout(() => {
      setResources([
        // Web Development Resources
        {
          id: 1,
          title: 'The Complete Web Development Bootcamp',
          provider: 'Udemy',
          instructor: 'Dr. Angela Yu',
          type: 'course',
          category: 'web-development',
          level: 'beginner',
          rating: 4.7,
          reviews: 158000,
          duration: '65 hours',
          isPaid: true,
          price: 1499,
          description: 'Become a full-stack web developer with just one course. HTML, CSS, Javascript, Node, React, MongoDB, and more!',
          tags: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'MongoDB'],
          icon: faLaptopCode,
          iconBg: '#4776E6',
          url: 'https://www.udemy.com/course/the-complete-web-development-bootcamp/'
        },
        {
          id: 2,
          title: 'React - The Complete Guide',
          provider: 'Udemy',
          instructor: 'Maximilian Schwarzmüller',
          type: 'course',
          category: 'web-development',
          level: 'intermediate',
          rating: 4.6,
          reviews: 135000,
          duration: '48 hours',
          isPaid: true,
          price: 1999,
          description: 'Dive in and learn React.js from scratch! Learn Reactjs, Hooks, Redux, React Routing, Animations, Next.js and way more!',
          tags: ['React', 'JavaScript', 'Redux', 'Hooks', 'Next.js'],
          icon: faLaptopCode,
          iconBg: '#4776E6',
          url: 'https://www.udemy.com/course/react-the-complete-guide-incl-redux/'
        },
        {
          id: 3,
          title: 'The Odin Project',
          provider: 'The Odin Project',
          instructor: 'Community',
          type: 'curriculum',
          category: 'web-development',
          level: 'beginner',
          rating: 4.8,
          reviews: 5000,
          duration: 'Self-paced',
          isPaid: false,
          description: 'The Odin Project provides a free open source coding curriculum that can be taken entirely online. It helps you learn web development with a focus on projects and real-world skills.',
          tags: ['HTML', 'CSS', 'JavaScript', 'Ruby on Rails', 'Full Stack'],
          icon: faLaptopCode,
          iconBg: '#4776E6',
          url: 'https://www.theodinproject.com/'
        },
        {
          id: 4,
          title: 'MDN Web Docs',
          provider: 'Mozilla',
          instructor: 'Mozilla Contributors',
          type: 'documentation',
          category: 'web-development',
          level: 'all-levels',
          rating: 4.9,
          reviews: 20000,
          duration: 'Self-paced',
          isPaid: false,
          description: 'The MDN Web Docs site provides information about Open Web technologies including HTML, CSS, and APIs for both Web sites and progressive web apps.',
          tags: ['HTML', 'CSS', 'JavaScript', 'Web APIs', 'Documentation'],
          icon: faBook,
          iconBg: '#4776E6',
          url: 'https://developer.mozilla.org/'
        },
        {
          id: 5,
          title: 'Full Stack Open',
          provider: 'University of Helsinki',
          instructor: 'University of Helsinki',
          type: 'course',
          category: 'web-development',
          level: 'intermediate',
          rating: 4.8,
          reviews: 8500,
          duration: 'Self-paced',
          isPaid: false,
          description: 'Learn React, Redux, Node.js, MongoDB, GraphQL and TypeScript in one go! This course will introduce you to modern JavaScript-based web development.',
          tags: ['React', 'Node.js', 'Express', 'MongoDB', 'GraphQL', 'TypeScript'],
          icon: faLaptopCode,
          iconBg: '#4776E6',
          url: 'https://fullstackopen.com/en/'
        },
        {
          id: 6,
          title: 'JavaScript30',
          provider: 'Wes Bos',
          instructor: 'Wes Bos',
          type: 'course',
          category: 'web-development',
          level: 'beginner',
          rating: 4.9,
          reviews: 12000,
          duration: '30 days',
          isPaid: false,
          description: 'Build 30 things in 30 days with vanilla JavaScript. No frameworks, no compilers, no libraries, no boilerplate.',
          tags: ['JavaScript', 'Vanilla JS', 'DOM', 'Web APIs', 'Projects'],
          icon: faLaptopCode,
          iconBg: '#4776E6',
          url: 'https://javascript30.com/'
        },
        
        // Data Science Resources
        {
          id: 7,
          title: 'Machine Learning A-Z™: Hands-On Python & R',
          provider: 'Udemy',
          instructor: 'Kirill Eremenko, Hadelin de Ponteves',
          type: 'course',
          category: 'data-science',
          level: 'intermediate',
          rating: 4.5,
          reviews: 145000,
          duration: '44 hours',
          isPaid: true,
          price: 1999,
          description: 'Learn to create Machine Learning Algorithms in Python and R from two Data Science experts.',
          tags: ['Python', 'R', 'Machine Learning', 'Data Science', 'AI'],
          icon: faChartBar,
          iconBg: '#36D1DC',
          url: 'https://www.udemy.com/course/machinelearning/'
        },
        {
          id: 8,
          title: 'Deep Learning Specialization',
          provider: 'Coursera',
          instructor: 'Andrew Ng',
          type: 'specialization',
          category: 'data-science',
          level: 'intermediate',
          rating: 4.9,
          reviews: 185000,
          duration: '3 months',
          isPaid: true,
          price: 4999,
          description: 'Master Deep Learning and break into AI. Learn to build neural networks and lead successful machine learning projects.',
          tags: ['Deep Learning', 'Neural Networks', 'TensorFlow', 'Python', 'AI'],
          icon: faChartBar,
          iconBg: '#36D1DC',
          url: 'https://www.coursera.org/specializations/deep-learning'
        },
        {
          id: 9,
          title: 'Data Science Handbook',
          provider: "O'Reilly",
          instructor: 'Jake VanderPlas',
          type: 'book',
          category: 'data-science',
          level: 'intermediate',
          rating: 4.8,
          reviews: 3200,
          duration: 'Self-paced',
          isPaid: false,
          description: 'A comprehensive introduction to the data science stack: scientific Python modules, data visualization, statistical modeling, and machine learning.',
          tags: ['Python', 'NumPy', 'Pandas', 'Matplotlib', 'Scikit-Learn'],
          icon: faBook,
          iconBg: '#36D1DC',
          url: 'https://jakevdp.github.io/PythonDataScienceHandbook/'
        },
        {
          id: 10,
          title: 'Kaggle Learn',
          provider: 'Kaggle',
          instructor: 'Kaggle Team',
          type: 'course',
          category: 'data-science',
          level: 'beginner',
          rating: 4.7,
          reviews: 25000,
          duration: 'Self-paced',
          isPaid: false,
          description: 'Gain the skills you need to do independent data science projects through hands-on, interactive lessons.',
          tags: ['Python', 'Machine Learning', 'Data Visualization', 'SQL', 'Pandas'],
          icon: faChartBar,
          iconBg: '#36D1DC',
          url: 'https://www.kaggle.com/learn'
        },
        {
          id: 11,
          title: 'Fast.ai Practical Deep Learning for Coders',
          provider: 'Fast.ai',
          instructor: 'Jeremy Howard & Rachel Thomas',
          type: 'course',
          category: 'data-science',
          level: 'intermediate',
          rating: 4.9,
          reviews: 15000,
          duration: '7 weeks',
          isPaid: false,
          description: 'A free course designed for people with some coding experience who want to learn how to apply deep learning and machine learning to practical problems.',
          tags: ['Deep Learning', 'PyTorch', 'Computer Vision', 'NLP', 'Python'],
          icon: faChartBar,
          iconBg: '#36D1DC',
          url: 'https://course.fast.ai/'
        },
        
        // UX Design Resources
        {
          id: 12,
          title: 'UI/UX Design Specialization',
          provider: 'Coursera',
          instructor: 'California Institute of the Arts',
          type: 'specialization',
          category: 'design',
          level: 'beginner',
          rating: 4.5,
          reviews: 18000,
          duration: '3 months',
          isPaid: true,
          price: 3999,
          description: 'Design High-Impact User Experiences. Research, design, and prototype effective, visually-driven websites and apps.',
          tags: ['UI Design', 'UX Design', 'User Research', 'Wireframing', 'Prototyping'],
          icon: faPalette,
          iconBg: '#FF5858',
          url: 'https://www.coursera.org/specializations/ui-ux-design'
        },
        {
          id: 13,
          title: 'Design for Developers',
          provider: 'Frontend Masters',
          instructor: 'Sarah Drasner',
          type: 'course',
          category: 'design',
          level: 'beginner',
          rating: 4.8,
          reviews: 5200,
          duration: '6 hours',
          isPaid: true,
          price: 3999,
          description: 'Learn design principles through the eyes of a developer. This course teaches the foundations of design theory, typography, layouts, color, and more.',
          tags: ['Design Theory', 'Typography', 'Color Theory', 'Layout', 'CSS'],
          icon: faPalette,
          iconBg: '#FF5858',
          url: 'https://frontendmasters.com/courses/design-for-developers/'
        },
        {
          id: 14,
          title: 'Figma UI/UX Design Essentials',
          provider: 'Udemy',
          instructor: 'Daniel Walter Scott',
          type: 'course',
          category: 'design',
          level: 'beginner',
          rating: 4.7,
          reviews: 32000,
          duration: '13 hours',
          isPaid: true,
          price: 1999,
          description: 'Learn how to design websites & mobile phone apps using Figma. Learn UI design essentials, UX design, web design & app design.',
          tags: ['Figma', 'UI Design', 'UX Design', 'Prototyping', 'Web Design'],
          icon: faPalette,
          iconBg: '#FF5858',
          url: 'https://www.udemy.com/course/figma-ux-ui-design-user-experience-tutorial/'
        },
        {
          id: 15,
          title: 'Laws of UX',
          provider: 'Laws of UX',
          instructor: 'Jon Yablonski',
          type: 'resource',
          category: 'design',
          level: 'all-levels',
          rating: 4.9,
          reviews: 8500,
          duration: 'Self-paced',
          isPaid: false,
          description: 'A collection of best practices that designers can consider when building user interfaces. It covers principles from psychology and human-computer interaction.',
          tags: ['UX Design', 'Design Principles', 'Psychology', 'Human-Computer Interaction'],
          icon: faPalette,
          iconBg: '#FF5858',
          url: 'https://lawsofux.com/'
        },
        {
          id: 16,
          title: 'Refactoring UI',
          provider: 'Refactoring UI',
          instructor: 'Adam Wathan & Steve Schoger',
          type: 'book',
          category: 'design',
          level: 'intermediate',
          rating: 4.9,
          reviews: 12000,
          duration: 'Self-paced',
          isPaid: true,
          price: 9900,
          description: 'Learn how to design beautiful user interfaces by yourself using specific tactics explained from a developer\'s point-of-view.',
          tags: ['UI Design', 'Visual Design', 'CSS', 'Color Theory', 'Typography'],
          icon: faPalette,
          iconBg: '#FF5858',
          url: 'https://www.refactoringui.com/book'
        },
        
        // Mobile Development Resources
        {
          id: 17,
          title: 'Flutter & Dart - The Complete Guide',
          provider: 'Udemy',
          instructor: 'Maximilian Schwarzmüller',
          type: 'course',
          category: 'mobile-development',
          level: 'intermediate',
          rating: 4.6,
          reviews: 42000,
          duration: '42 hours',
          isPaid: true,
          price: 1999,
          description: 'A Complete Guide to the Flutter SDK & Flutter Framework for building native iOS and Android apps.',
          tags: ['Flutter', 'Dart', 'Mobile Development', 'iOS', 'Android'],
          icon: faMobileAlt,
          iconBg: '#5CDB95',
          url: 'https://www.udemy.com/course/learn-flutter-dart-to-build-ios-android-apps/'
        },
        {
          id: 18,
          title: 'React Native - The Practical Guide',
          provider: 'Udemy',
          instructor: 'Maximilian Schwarzmüller',
          type: 'course',
          category: 'mobile-development',
          level: 'intermediate',
          rating: 4.7,
          reviews: 38000,
          duration: '45 hours',
          isPaid: true,
          price: 1999,
          description: 'Use React Native and your React knowledge to build native iOS and Android Apps - incl. Push Notifications, Hooks, Redux',
          tags: ['React Native', 'JavaScript', 'iOS', 'Android', 'Redux'],
          icon: faMobileAlt,
          iconBg: '#5CDB95',
          url: 'https://www.udemy.com/course/react-native-the-practical-guide/'
        },
        {
          id: 19,
          title: 'iOS & Swift - The Complete iOS App Development Bootcamp',
          provider: 'Udemy',
          instructor: 'Dr. Angela Yu',
          type: 'course',
          category: 'mobile-development',
          level: 'beginner',
          rating: 4.8,
          reviews: 65000,
          duration: '60 hours',
          isPaid: true,
          price: 1999,
          description: 'From beginner to iOS App Developer with just one course. Learn to code and build apps with Swift and Xcode.',
          tags: ['iOS', 'Swift', 'Xcode', 'UIKit', 'SwiftUI'],
          icon: faMobileAlt,
          iconBg: '#5CDB95',
          url: 'https://www.udemy.com/course/ios-13-app-development-bootcamp/'
        },
        {
          id: 20,
          title: 'Android Kotlin Developer Nanodegree',
          provider: 'Udacity',
          instructor: 'Google',
          type: 'nanodegree',
          category: 'mobile-development',
          level: 'intermediate',
          rating: 4.7,
          reviews: 12000,
          duration: '4 months',
          isPaid: true,
          price: 15999,
          description: 'Built in collaboration with Google, this program will prepare you to become a professional Android developer and allow you to create a diverse portfolio of projects.',
          tags: ['Android', 'Kotlin', 'MVVM', 'Room', 'Navigation'],
          icon: faMobileAlt,
          iconBg: '#5CDB95',
          url: 'https://www.udacity.com/course/android-kotlin-developer-nanodegree--nd940'
        },
        
        // DevOps & Cloud Resources
        {
          id: 21,
          title: 'DevOps with Docker, Kubernetes & Terraform',
          provider: 'Udemy',
          instructor: 'Mumshad Mannambeth',
          type: 'course',
          category: 'devops',
          level: 'intermediate',
          rating: 4.6,
          reviews: 28000,
          duration: '38 hours',
          isPaid: true,
          price: 1999,
          description: 'Learn DevOps with Docker, Kubernetes, Terraform, Ansible, Jenkins, and more. Includes hands-on labs and projects.',
          tags: ['Docker', 'Kubernetes', 'Terraform', 'DevOps', 'CI/CD'],
          icon: faServer,
          iconBg: '#FF5E62',
          url: 'https://www.udemy.com/course/devops-with-docker-kubernetes-and-terraform/'
        },
        {
          id: 22,
          title: 'AWS Certified Solutions Architect',
          provider: 'A Cloud Guru',
          instructor: 'Ryan Kroonenburg',
          type: 'certification',
          category: 'cloud-computing',
          level: 'advanced',
          rating: 4.7,
          reviews: 32000,
          duration: '40 hours',
          isPaid: true,
          price: 3999,
          description: 'Prepare for the AWS Solutions Architect Associate certification. Learn to design and deploy scalable systems on AWS.',
          tags: ['AWS', 'Cloud Computing', 'DevOps', 'Infrastructure', 'Certification'],
          icon: faDatabase,
          iconBg: '#FF8C00',
          url: 'https://acloudguru.com/course/aws-certified-solutions-architect-associate-saa-c02'
        },
        {
          id: 23,
          title: 'Kubernetes: Up and Running',
          provider: "O'Reilly",
          instructor: 'Kelsey Hightower, Brendan Burns, Joe Beda',
          type: 'book',
          category: 'devops',
          level: 'intermediate',
          rating: 4.8,
          reviews: 5200,
          duration: 'Self-paced',
          isPaid: true,
          price: 2999,
          description: 'Dive into the world of Kubernetes, the leading container orchestrator. Learn how to deploy, scale, and manage containerized applications.',
          tags: ['Kubernetes', 'Docker', 'Containers', 'Orchestration', 'DevOps'],
          icon: faServer,
          iconBg: '#FF5E62',
          url: 'https://www.oreilly.com/library/view/kubernetes-up-and/9781492046523/'
        },
        {
          id: 24,
          title: 'Google Cloud Platform Fundamentals',
          provider: 'Coursera',
          instructor: 'Google Cloud',
          type: 'course',
          category: 'cloud-computing',
          level: 'beginner',
          rating: 4.6,
          reviews: 18000,
          duration: '12 hours',
          isPaid: true,
          price: 2999,
          description: 'Learn the fundamentals of Google Cloud Platform and how to use its core services. Perfect for beginners looking to start with cloud computing.',
          tags: ['GCP', 'Cloud Computing', 'Google Cloud', 'Infrastructure', 'DevOps'],
          icon: faDatabase,
          iconBg: '#FF8C00',
          url: 'https://www.coursera.org/learn/gcp-fundamentals'
        },
        {
          id: 25,
          title: 'DevOps Roadmap',
          provider: 'roadmap.sh',
          instructor: 'Community',
          type: 'resource',
          category: 'devops',
          level: 'all-levels',
          rating: 4.9,
          reviews: 8500,
          duration: 'Self-paced',
          isPaid: false,
          description: 'Step by step guide to becoming a DevOps engineer in 2023. This roadmap covers all the essential skills and tools you need to master.',
          tags: ['DevOps', 'CI/CD', 'Infrastructure', 'Monitoring', 'Cloud'],
          icon: faServer,
          iconBg: '#FF5E62',
          url: 'https://roadmap.sh/devops'
        },
        
        // Computer Science Resources
        {
          id: 26,
          title: 'CS50: Introduction to Computer Science',
          provider: 'Harvard (edX)',
          instructor: 'David J. Malan',
          type: 'course',
          category: 'computer-science',
          level: 'beginner',
          rating: 4.9,
          reviews: 25000,
          duration: '12 weeks',
          isPaid: false,
          description: 'An introduction to the intellectual enterprises of computer science and the art of programming. This course teaches students how to think algorithmically and solve problems efficiently.',
          tags: ['Computer Science', 'C', 'Python', 'SQL', 'Algorithms'],
          icon: faGraduationCap,
          iconBg: '#8E54E9',
          url: 'https://www.edx.org/course/cs50s-introduction-to-computer-science'
        },
        {
          id: 27,
          title: 'JavaScript Algorithms and Data Structures',
          provider: 'freeCodeCamp',
          instructor: 'freeCodeCamp Team',
          type: 'course',
          category: 'programming',
          level: 'intermediate',
          rating: 4.8,
          reviews: 12000,
          duration: '300 hours',
          isPaid: false,
          description: 'Learn fundamental programming concepts in JavaScript. You will start with basic data structures like numbers and strings. Then you will learn to work with arrays, objects, functions, loops, and more.',
          tags: ['JavaScript', 'Algorithms', 'Data Structures', 'Programming'],
          icon: faCode,
          iconBg: '#FF5858',
          url: 'https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/'
        },
        {
          id: 28,
          title: 'Grokking Algorithms',
          provider: 'Manning Publications',
          instructor: 'Aditya Bhargava',
          type: 'book',
          category: 'programming',
          level: 'beginner',
          rating: 4.7,
          reviews: 3500,
          duration: 'Self-paced',
          isPaid: true,
          price: 2499,
          description: 'An illustrated guide for programmers and other curious people. Learn algorithms in a friendly way with clear explanations and illustrations.',
          tags: ['Algorithms', 'Data Structures', 'Python', 'Computer Science'],
          icon: faCode,
          iconBg: '#FF5858',
          url: 'https://www.manning.com/books/grokking-algorithms'
        },
        {
          id: 29,
          title: 'MIT OpenCourseWare: Introduction to Algorithms',
          provider: 'MIT',
          instructor: 'Erik Demaine, Srini Devadas',
          type: 'course',
          category: 'computer-science',
          level: 'intermediate',
          rating: 4.9,
          reviews: 15000,
          duration: 'Self-paced',
          isPaid: false,
          description: 'This course provides an introduction to mathematical modeling of computational problems and the design and analysis of algorithms.',
          tags: ['Algorithms', 'Data Structures', 'Complexity', 'Computer Science'],
          icon: faGraduationCap,
          iconBg: '#8E54E9',
          url: 'https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-006-introduction-to-algorithms-fall-2011/'
        },
        
        // Additional Resources
        {
          id: 30,
          title: 'Digital Marketing Specialization',
          provider: 'Coursera',
          instructor: 'University of Illinois',
          type: 'specialization',
          category: 'marketing',
          level: 'beginner',
          rating: 4.5,
          reviews: 15000,
          duration: '8 months',
          isPaid: true,
          price: 4999,
          description: 'Master strategic marketing concepts and tools to address brand communication in a digital world.',
          tags: ['Digital Marketing', 'SEO', 'Social Media', 'Content Marketing', 'Analytics'],
          icon: faUsers,
          iconBg: '#4776E6',
          url: 'https://www.coursera.org/specializations/digital-marketing'
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);
  
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };
  
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  
  // Generate star rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <FontAwesomeIcon 
          key={i} 
          icon={faStar} 
          className={i < Math.floor(rating) ? 'text-warning' : 'text-muted'}
        />
      );
    }
    return stars;
  };
  
  const filteredResources = resources.filter(resource => {
    // Tab filter
    if (activeTab !== 'all' && resource.category !== activeTab) {
      return false;
    }
    
    // Search filter
    if (filters.search && !resource.title.toLowerCase().includes(filters.search.toLowerCase()) && 
        !resource.provider.toLowerCase().includes(filters.search.toLowerCase()) &&
        !resource.description.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    
    // Category filter
    if (filters.category && resource.category !== filters.category) {
      return false;
    }
    
    // Type filter
    if (filters.type && resource.type !== filters.type) {
      return false;
    }
    
    // Level filter
    if (filters.level && resource.level !== filters.level) {
      return false;
    }
    
    // Price filter
    if (filters.price === 'free' && resource.isPaid) {
      return false;
    }
    if (filters.price === 'paid' && !resource.isPaid) {
      return false;
    }
    
    return true;
  });
  
  return (
    <Container className="py-5">
      <h1 className="mb-4">Learning Resources</h1>
      
      {/* Search */}
      <Card className="mb-4">
        <Card.Body className="p-4">
          <Row>
            <Col lg={10} className="mb-3 mb-lg-0">
              <InputGroup>
                <InputGroup.Text>
                  <FontAwesomeIcon icon={faSearch} />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Search for courses, tutorials, or topics"
                  name="search"
                  value={filters.search}
                  onChange={handleFilterChange}
                />
              </InputGroup>
            </Col>
            <Col lg={2}>
              <Button variant="primary" className="w-100">
                <FontAwesomeIcon icon={faSearch} className="me-2" />
                Search
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      
      {/* Category Tabs */}
      <Tabs
        activeKey={activeTab}
        onSelect={handleTabChange}
        className="mb-4 resource-tabs"
      >
        <Tab eventKey="all" title="All Resources" />
        <Tab eventKey="web-development" title={
          <span><FontAwesomeIcon icon={faLaptopCode} className="me-2" />Web Development</span>
        } />
        <Tab eventKey="data-science" title={
          <span><FontAwesomeIcon icon={faChartBar} className="me-2" />Data Science</span>
        } />
        <Tab eventKey="design" title={
          <span><FontAwesomeIcon icon={faPalette} className="me-2" />Design</span>
        } />
        <Tab eventKey="mobile-development" title={
          <span><FontAwesomeIcon icon={faMobileAlt} className="me-2" />Mobile Dev</span>
        } />
        <Tab eventKey="cloud-computing" title={
          <span><FontAwesomeIcon icon={faDatabase} className="me-2" />Cloud</span>
        } />
        <Tab eventKey="devops" title={
          <span><FontAwesomeIcon icon={faServer} className="me-2" />DevOps</span>
        } />
        <Tab eventKey="computer-science" title={
          <span><FontAwesomeIcon icon={faGraduationCap} className="me-2" />CS</span>
        } />
      </Tabs>
      
      <Row>
        {/* Filters Sidebar */}
        <Col lg={3} className="mb-4">
          <Card>
            <Card.Body className="p-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="mb-0">Filters</h5>
                <Button variant="link" className="p-0" onClick={() => setFilters({
                  search: '',
                  category: '',
                  type: '',
                  level: '',
                  price: ''
                })}>
                  Clear All
                </Button>
              </div>
              
              <Form>
                <Form.Group className="mb-4">
                  <Form.Label>Resource Type</Form.Label>
                  <Form.Select 
                    name="type"
                    value={filters.type}
                    onChange={handleFilterChange}
                  >
                    <option value="">All Types</option>
                    <option value="course">Courses</option>
                    <option value="tutorial">Tutorials</option>
                    <option value="documentation">Documentation</option>
                    <option value="book">Books</option>
                    <option value="video">Videos</option>
                    <option value="specialization">Specializations</option>
                    <option value="certification">Certifications</option>
                  </Form.Select>
                </Form.Group>
                
                <Form.Group className="mb-4">
                  <Form.Label>Level</Form.Label>
                  <Form.Select 
                    name="level"
                    value={filters.level}
                    onChange={handleFilterChange}
                  >
                    <option value="">All Levels</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                    <option value="all-levels">All Levels</option>
                  </Form.Select>
                </Form.Group>
                
                <Form.Group className="mb-4">
                  <Form.Label>Price</Form.Label>
                  <Form.Select 
                    name="price"
                    value={filters.price}
                    onChange={handleFilterChange}
                  >
                    <option value="">All Prices</option>
                    <option value="free">Free</option>
                    <option value="paid">Paid</option>
                  </Form.Select>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        
        {/* Resource Listings */}
        <Col lg={9}>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h5 className="mb-0">
              {loading ? 'Loading resources...' : `${filteredResources.length} Resources Found`}
            </h5>
            <Form.Select className="w-auto">
              <option>Most Relevant</option>
              <option>Highest Rated</option>
              <option>Newest</option>
            </Form.Select>
          </div>
          
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3">Loading resources...</p>
            </div>
          ) : filteredResources.length === 0 ? (
            <Card className="text-center py-5">
              <Card.Body>
                <h4>No resources found</h4>
                <p className="text-muted">Try adjusting your search filters</p>
              </Card.Body>
            </Card>
          ) : (
            <Row>
              {filteredResources.map(resource => (
                <Col lg={6} key={resource.id} className="mb-4">
                  <Card className="resource-card h-100">
                    <Card.Body className="p-4">
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <div className="resource-icon" style={{ backgroundColor: resource.iconBg }}>
                          <FontAwesomeIcon icon={resource.icon} />
                        </div>
                        <Badge bg={resource.isPaid ? 'warning' : 'success'}>
                          {resource.isPaid ? 'Paid' : 'Free'}
                        </Badge>
                      </div>
                      
                      <Card.Title className="mb-2">{resource.title}</Card.Title>
                      <div className="mb-2">
                        <span className="resource-provider">{resource.provider}</span>
                        {resource.instructor && (
                          <span className="resource-instructor"> • {resource.instructor}</span>
                        )}
                      </div>
                      
                      <div className="mb-3">
                        <div className="resource-rating">
                          {renderStars(resource.rating)}
                          <span className="ms-2">{resource.rating} ({resource.reviews.toLocaleString()})</span>
                        </div>
                      </div>
                      
                      <Card.Text className="text-muted mb-3">
                        {resource.description}
                      </Card.Text>
                      
                      <div className="mb-3">
                        {resource.tags.map((tag, index) => (
                          <Badge bg="light" text="dark" key={index} className="me-2 mb-2">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          {resource.isPaid && (
                            <span className="resource-price">₹{resource.price}</span>
                          )}
                          {resource.duration && (
                            <span className="resource-duration ms-3">
                              <FontAwesomeIcon icon={faGraduationCap} className="me-1" />
                              {resource.duration}
                            </span>
                          )}
                        </div>
                        <div>
                          <Button variant="outline-secondary" className="me-2">
                            <FontAwesomeIcon icon={faBookmark} />
                          </Button>
                          <a href={resource.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                            <FontAwesomeIcon icon={faExternalLinkAlt} className="me-2" />
                            View
                          </a>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
          
          {!loading && filteredResources.length > 0 && (
            <div className="d-flex justify-content-center mt-4">
              <Button variant="outline-primary" className="me-2">Previous</Button>
              <Button variant="primary" className="me-2">1</Button>
              <Button variant="outline-primary" className="me-2">2</Button>
              <Button variant="outline-primary" className="me-2">3</Button>
              <Button variant="outline-primary">Next</Button>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Resources;