import {
    faBriefcase,
    faChartBar,
    faChartLine,
    faDatabase,
    faGraduationCap,
    faLaptopCode,
    faMobileAlt,
    faPalette,
    faRoad,
    faRobot,
    faServer,
    faUsers
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Home.css';

// Import placeholder images
import {
    heroImage,
    testimonial1,
    testimonial2,
    testimonial3
} from '../../assets/images/placeholder';

const Home = () => {
  const features = [
    {
      icon: faRoad,
      title: 'Personalized Roadmaps',
      description: 'Get customized learning paths based on your interests, goals, and current skill level.'
    },
    {
      icon: faBriefcase,
      title: 'Job Recommendations',
      description: 'Discover relevant job and internship opportunities tailored to your skills and career aspirations.'
    },
    {
      icon: faGraduationCap,
      title: 'Learning Resources',
      description: 'Access curated free and paid learning platforms, courses, and materials for your chosen field.'
    },
    {
      icon: faChartLine,
      title: 'Progress Tracking',
      description: 'Monitor your learning journey with detailed progress tracking and milestone achievements.'
    }
  ];

  const domains = [
    { icon: faLaptopCode, name: 'Web Development', color: '#4776E6' },
    { icon: faRobot, name: 'Artificial Intelligence', color: '#8E54E9' },
    { icon: faPalette, name: 'UI/UX Design', color: '#FF5858' },
    { icon: faChartBar, name: 'Data Science', color: '#36D1DC' },
    { icon: faMobileAlt, name: 'Mobile Development', color: '#5CDB95' },
    { icon: faDatabase, name: 'Cloud Computing', color: '#FF8C00' },
    { icon: faServer, name: 'DevOps', color: '#FF5E62' },
    { icon: faUsers, name: 'Digital Marketing', color: '#4776E6' }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Frontend Developer',
      image: testimonial1,
      text: 'AI Mentor helped me transition from a marketing role to a frontend developer position in just 6 months. The personalized roadmap was exactly what I needed!'
    },
    {
      name: 'Michael Chen',
      role: 'Data Scientist',
      image: testimonial2,
      text: 'The curated resources and job recommendations were invaluable. I landed my dream job at a tech startup after following the AI Mentor roadmap for data science.'
    },
    {
      name: 'Priya Sharma',
      role: 'UX Designer',
      image: testimonial3,
      text: 'As someone who was overwhelmed by the amount of information online, AI Mentor provided clear direction and structure to my learning journey.'
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section text-white">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="mb-5 mb-lg-0">
              <h1 className="display-4 fw-bold mb-4">Your AI-Powered Career Guide</h1>
              <p className="lead mb-4">
                Get personalized roadmaps, job recommendations, and learning resources tailored to your interests and goals.
              </p>
              <div className="d-grid gap-2 d-md-flex">
                <Link to="/register">
                  <Button variant="primary" size="lg" className="me-md-2 px-4 py-2">
                    Get Started
                  </Button>
                </Link>
                <Link to="/about">
                  <Button variant="outline-light" size="lg" className="px-4 py-2">
                    Learn More
                  </Button>
                </Link>
              </div>
            </Col>
            <Col lg={6} className="text-center">
              <img 
                src={heroImage} 
                alt="AI Mentor" 
                className="img-fluid hero-image"
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-5">
        <Container>
          <div className="text-center mb-5">
            <h2 className="section-title">How AI Mentor Helps You</h2>
            <p className="section-subtitle">Accelerate your career growth with our intelligent platform</p>
          </div>
          <Row>
            {features.map((feature, index) => (
              <Col md={6} lg={3} key={index} className="mb-4">
                <Card className="feature-card h-100">
                  <Card.Body className="text-center p-4">
                    <div className="feature-icon mb-3">
                      <FontAwesomeIcon icon={feature.icon} size="2x" />
                    </div>
                    <Card.Title className="mb-3">{feature.title}</Card.Title>
                    <Card.Text className="text-muted">
                      {feature.description}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Domains Section */}
      <section className="py-5 bg-light">
        <Container>
          <div className="text-center mb-5">
            <h2 className="section-title">Explore Career Domains</h2>
            <p className="section-subtitle">Discover learning paths across various tech and digital fields</p>
          </div>
          <Row className="justify-content-center">
            {domains.map((domain, index) => (
              <Col xs={6} md={4} lg={3} key={index} className="mb-4">
                <Card className="domain-card h-100">
                  <Card.Body className="text-center p-4">
                    <div className="domain-icon mb-3" style={{ backgroundColor: domain.color }}>
                      <FontAwesomeIcon icon={domain.icon} />
                    </div>
                    <Card.Title className="domain-title">{domain.name}</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <div className="text-center mt-4">
            <Link to="/register">
              <Button variant="primary" size="lg">
                Find Your Path
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* How It Works Section */}
      <section className="py-5">
        <Container>
          <div className="text-center mb-5">
            <h2 className="section-title">How It Works</h2>
            <p className="section-subtitle">Three simple steps to start your personalized learning journey</p>
          </div>
          <Row className="justify-content-center">
            <Col md={4} className="mb-4 mb-md-0">
              <div className="step-card text-center">
                <div className="step-number">1</div>
                <h3 className="step-title">Share Your Interests</h3>
                <p className="step-description">
                  Tell us about your interests, current skills, and career goals through a simple questionnaire.
                </p>
              </div>
            </Col>
            <Col md={4} className="mb-4 mb-md-0">
              <div className="step-card text-center">
                <div className="step-number">2</div>
                <h3 className="step-title">Get Your Roadmap</h3>
                <p className="step-description">
                  Receive a personalized learning roadmap with curated resources and skill milestones.
                </p>
              </div>
            </Col>
            <Col md={4}>
              <div className="step-card text-center">
                <div className="step-number">3</div>
                <h3 className="step-title">Track & Grow</h3>
                <p className="step-description">
                  Follow your roadmap, track your progress, and discover job opportunities as you grow.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Testimonials Section */}
      <section className="py-5 bg-light">
        <Container>
          <div className="text-center mb-5">
            <h2 className="section-title">Success Stories</h2>
            <p className="section-subtitle">Hear from users who transformed their careers with AI Mentor</p>
          </div>
          <Row>
            {testimonials.map((testimonial, index) => (
              <Col md={4} key={index} className="mb-4">
                <Card className="testimonial-card h-100">
                  <Card.Body className="p-4">
                    <div className="testimonial-content mb-4">
                      <p className="testimonial-text">"{testimonial.text}"</p>
                    </div>
                    <div className="d-flex align-items-center">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name} 
                        className="testimonial-image me-3"
                      />
                      <div>
                        <h5 className="testimonial-name mb-1">{testimonial.name}</h5>
                        <p className="testimonial-role text-muted mb-0">{testimonial.role}</p>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="cta-section text-white text-center py-5">
        <Container>
          <h2 className="mb-4">Ready to Start Your Learning Journey?</h2>
          <p className="lead mb-4">
            Join thousands of users who have accelerated their careers with AI Mentor
          </p>
          <Link to="/register">
            <Button variant="light" size="lg" className="px-5 py-3">
              Get Started for Free
            </Button>
          </Link>
        </Container>
      </section>
    </>
  );
};

export default Home;