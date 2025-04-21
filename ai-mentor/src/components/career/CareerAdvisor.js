import { faBrain, faBriefcase, faChartLine, faGraduationCap, faLaptopCode } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Alert, Badge, Button, Card, Col, Form, Row, Spinner } from 'react-bootstrap';
import { getCareerAdvice } from '../../services/careerService';
import './Career.css';

const CareerAdvisor = () => {
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [advice, setAdvice] = useState(null);
  const [showExamples, setShowExamples] = useState(true);

  const examples = [
    "What tech roles will be in demand in the next 5 years?",
    "I'm good at problem-solving and math. What tech career would suit me?",
    "I'm interested in AI and machine learning. What skills should I learn?",
    "What are the highest paying tech jobs in 2024?",
    "I'm a graphic designer. How can I transition to UX/UI design?"
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    setLoading(true);
    setError(null);
    setShowExamples(false);
    
    try {
      const result = await getCareerAdvice(userInput);
      setAdvice(result);
    } catch (err) {
      setError(err.message || 'Failed to get career advice. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleExampleClick = (example) => {
    setUserInput(example);
  };

  return (
    <div className="career-advisor">
      <Card className="shadow-sm mb-4">
        <Card.Body className="p-4">
          <h2 className="mb-4">
            <FontAwesomeIcon icon={faBrain} className="me-2 text-primary" />
            AI Career Advisor
          </h2>
          <p className="lead mb-4">
            Ask about tech careers, future job trends, skills to learn, or get personalized career advice based on your interests and strengths.
          </p>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Control
                as="textarea"
                rows={3}
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Ask about tech careers, skills, or job market trends..."
                disabled={loading}
              />
            </Form.Group>
            <div className="d-grid">
              <Button 
                variant="primary" 
                type="submit" 
                size="lg"
                disabled={loading || !userInput.trim()}
              >
                {loading ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      className="me-2"
                    />
                    Getting advice...
                  </>
                ) : (
                  'Get Career Advice'
                )}
              </Button>
            </div>
          </Form>

          {showExamples && (
            <div className="mt-4">
              <h5 className="text-muted mb-3">Try asking about:</h5>
              <div className="d-flex flex-wrap gap-2">
                {examples.map((example, index) => (
                  <Badge 
                    key={index} 
                    bg="light" 
                    text="dark" 
                    className="p-2 example-badge" 
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleExampleClick(example)}
                  >
                    {example}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </Card.Body>
      </Card>

      {error && <Alert variant="danger">{error}</Alert>}

      {advice && (
        <Card className="shadow-sm">
          <Card.Body className="p-4">
            <h3 className="mb-4">Career Insights</h3>
            
            {advice.summary && (
              <div className="mb-4">
                <h4 className="h5 text-primary">
                  <FontAwesomeIcon icon={faChartLine} className="me-2" />
                  Summary
                </h4>
                <p className="lead">{advice.summary}</p>
              </div>
            )}

            {advice.roles && advice.roles.length > 0 && (
              <div className="mb-4">
                <h4 className="h5 text-primary">
                  <FontAwesomeIcon icon={faBriefcase} className="me-2" />
                  Recommended Roles
                </h4>
                <Row className="g-3 mt-1">
                  {advice.roles.map((role, index) => (
                    <Col md={6} key={index}>
                      <Card className="h-100 border-0 shadow-sm">
                        <Card.Body>
                          <h5>{role.title}</h5>
                          <p className="text-muted mb-2">{role.description}</p>
                          <div className="d-flex align-items-center mt-3">
                            <Badge bg="success" className="me-2">
                              Growth: {role.growthPotential}
                            </Badge>
                            <Badge bg="info">
                              Salary: {role.salaryRange}
                            </Badge>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </div>
            )}

            {advice.skills && advice.skills.length > 0 && (
              <div className="mb-4">
                <h4 className="h5 text-primary">
                  <FontAwesomeIcon icon={faLaptopCode} className="me-2" />
                  Key Skills to Develop
                </h4>
                <Row className="g-3 mt-1">
                  {advice.skills.map((skill, index) => (
                    <Col md={4} key={index}>
                      <Card className="h-100 border-0 shadow-sm">
                        <Card.Body>
                          <h5>{skill.name}</h5>
                          <p className="text-muted mb-2">{skill.description}</p>
                          <Badge bg={skill.importance === 'High' ? 'danger' : skill.importance === 'Medium' ? 'warning' : 'info'}>
                            Importance: {skill.importance}
                          </Badge>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </div>
            )}

            {advice.learningPath && (
              <div className="mb-4">
                <h4 className="h5 text-primary">
                  <FontAwesomeIcon icon={faGraduationCap} className="me-2" />
                  Suggested Learning Path
                </h4>
                <p>{advice.learningPath}</p>
              </div>
            )}

            {advice.additionalAdvice && (
              <div>
                <h4 className="h5 text-primary">Additional Advice</h4>
                <p>{advice.additionalAdvice}</p>
              </div>
            )}
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default CareerAdvisor;