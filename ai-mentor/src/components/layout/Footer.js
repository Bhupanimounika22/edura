import { faFacebook, faGithub, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faRobot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer bg-dark text-white py-5 mt-auto">
      <Container>
        <Row className="mb-4">
          <Col lg={4} md={6} className="mb-4 mb-md-0">
            <div className="d-flex align-items-center mb-3">
              <FontAwesomeIcon icon={faRobot} className="me-2 text-primary" size="2x" />
              <h5 className="mb-0 brand-text">Edura</h5>
            </div>
            <p className="text-muted">
              Your personalized AI career guide. Get customized roadmaps, job recommendations, and learning resources tailored to your interests and goals.
            </p>
            <div className="social-icons">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="me-3">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="me-3">
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="me-3">
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faGithub} />
              </a>
            </div>
          </Col>
          <Col lg={2} md={6} className="mb-4 mb-md-0">
            <h5 className="mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/" className="footer-link">Home</Link></li>
              <li className="mb-2"><Link to="/about" className="footer-link">About</Link></li>
              <li className="mb-2"><Link to="/dashboard" className="footer-link">Dashboard</Link></li>
              <li className="mb-2"><Link to="/jobs" className="footer-link">Jobs</Link></li>
              <li className="mb-2"><Link to="/resources" className="footer-link">Resources</Link></li>
            </ul>
          </Col>
          <Col lg={3} md={6} className="mb-4 mb-md-0">
            <h5 className="mb-3">Resources</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><a href="#" className="footer-link">Blog</a></li>
              <li className="mb-2"><a href="#" className="footer-link">Career Tips</a></li>
              <li className="mb-2"><a href="#" className="footer-link">Learning Paths</a></li>
              <li className="mb-2"><a href="#" className="footer-link">Success Stories</a></li>
              <li className="mb-2"><a href="#" className="footer-link">FAQ</a></li>
            </ul>
          </Col>
          <Col lg={3} md={6}>
            <h5 className="mb-3">Contact Us</h5>
            <ul className="list-unstyled">
              <li className="mb-2">Email: mounika.21mic7156@gmail.com</li>
              <li className="mb-2">Phone: +91 9866237952</li>
              <li className="mb-2">Address: VIT-AP University, Amaravati, Andhra Pradesh, India</li>
            </ul>
            <div className="mt-3">
              <Link to="/contact" className="btn btn-outline-light btn-sm">Contact Us</Link>
            </div>
          </Col>
        </Row>
        <hr className="my-4 bg-secondary" />
        <Row>
          <Col md={6} className="mb-3 mb-md-0">
            <p className="mb-0 text-muted">© {currentYear} AI Mentor. All rights reserved.</p>
          </Col>
          <Col md={6} className="text-md-end">
            <Link to="/privacy" className="text-muted me-3">Privacy Policy</Link>
            <Link to="/terms" className="text-muted">Terms of Service</Link>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;