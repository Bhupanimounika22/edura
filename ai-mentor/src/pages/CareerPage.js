import { faBriefcase, faLightbulb, faRocket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import CareerAdvisor from '../components/career/CareerAdvisor';

const CareerPage = () => {
  return (
    <Container className="py-5">
      <Row className="mb-5">
        <Col>
          <h1 className="display-4 fw-bold mb-4">Career Advisor</h1>
          <p className="lead">
            Get personalized career guidance, discover in-demand skills, and explore future-proof tech roles with our AI-powered career advisor.
          </p>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col lg={4} className="mb-4">
          <Card className="h-100 border-0 shadow-sm text-center p-4">
            <div className="icon-wrapper mb-3 mx-auto">
              <FontAwesomeIcon icon={faBriefcase} size="2x" className="text-primary" />
            </div>
            <Card.Body>
              <h3 className="h4 mb-3">Future-Proof Careers</h3>
              <p className="text-muted">
                Discover tech roles with long-term growth potential based on industry trends and market analysis.
              </p>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={4} className="mb-4">
          <Card className="h-100 border-0 shadow-sm text-center p-4">
            <div className="icon-wrapper mb-3 mx-auto">
              <FontAwesomeIcon icon={faLightbulb} size="2x" className="text-primary" />
            </div>
            <Card.Body>
              <h3 className="h4 mb-3">Skill Recommendations</h3>
              <p className="text-muted">
                Get personalized recommendations for skills to develop based on your interests and career goals.
              </p>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={4} className="mb-4">
          <Card className="h-100 border-0 shadow-sm text-center p-4">
            <div className="icon-wrapper mb-3 mx-auto">
              <FontAwesomeIcon icon={faRocket} size="2x" className="text-primary" />
            </div>
            <Card.Body>
              <h3 className="h4 mb-3">Learning Pathways</h3>
              <p className="text-muted">
                Receive customized learning paths to help you transition into new roles or advance in your current career.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <CareerAdvisor />
        </Col>
      </Row>
    </Container>
  );
};

export default CareerPage;