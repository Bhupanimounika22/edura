import React, { useState } from 'react';
import { Alert, Button, Card, Col, Form, Row, Spinner } from 'react-bootstrap';
import { useRoadmap } from '../../contexts/RoadmapContext';

const roles = [
  { value: 'frontend', label: 'Frontend Developer' },
  { value: 'backend', label: 'Backend Developer' },
  { value: 'fullstack', label: 'Full Stack Developer' },
  { value: 'mobile', label: 'Mobile Developer' },
  { value: 'devops', label: 'DevOps Engineer' },
  { value: 'data-science', label: 'Data Scientist' },
  { value: 'machine-learning', label: 'Machine Learning Engineer' },
  { value: 'ui-ux', label: 'UI/UX Designer' },
  { value: 'game-dev', label: 'Game Developer' },
  { value: 'blockchain', label: 'Blockchain Developer' }
];

const languageOptions = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'csharp', label: 'C#' },
  { value: 'cpp', label: 'C++' },
  { value: 'go', label: 'Go' },
  { value: 'ruby', label: 'Ruby' },
  { value: 'php', label: 'PHP' },
  { value: 'swift', label: 'Swift' },
  { value: 'kotlin', label: 'Kotlin' },
  { value: 'rust', label: 'Rust' },
  { value: 'typescript', label: 'TypeScript' }
];

const experienceLevels = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' }
];

const RoadmapGenerator = ({ onRoadmapGenerated }) => {
  const { createRoadmap, loading, error } = useRoadmap();
  const [role, setRole] = useState('');
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [experienceLevel, setExperienceLevel] = useState('beginner');
  const [formError, setFormError] = useState('');

  const handleLanguageChange = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setSelectedLanguages([...selectedLanguages, value]);
    } else {
      setSelectedLanguages(selectedLanguages.filter(language => language !== value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!role) {
      setFormError('Please select a role');
      return;
    }

    try {
      // Convert selected languages to labels for better prompting
      const languageLabels = selectedLanguages.map(
        languageValue => languageOptions.find(option => option.value === languageValue)?.label
      ).filter(Boolean);

      const roadmap = await createRoadmap(
        roles.find(r => r.value === role)?.label || role,
        languageLabels,
        experienceLevel
      );
      
      if (onRoadmapGenerated) {
        onRoadmapGenerated(roadmap);
      }
    } catch (err) {
      setFormError(err.message || 'Failed to generate roadmap');
    }
  };

  return (
    <Card className="shadow-sm">
      <Card.Body className="p-4">
        <h3 className="mb-4">Generate Your Learning Roadmap</h3>
        
        {formError && <Alert variant="danger">{formError}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}
        
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-4">
            <Form.Label>What role are you interested in?</Form.Label>
            <Form.Select 
              value={role} 
              onChange={(e) => setRole(e.target.value)}
              disabled={loading}
              required
            >
              <option value="">Select a role</option>
              {roles.map(roleOption => (
                <option key={roleOption.value} value={roleOption.value}>
                  {roleOption.label}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          
          <Form.Group className="mb-4">
            <Form.Label>Preferred programming languages (Optional)</Form.Label>
            <Row>
              {languageOptions.map(language => (
                <Col md={4} key={language.value}>
                  <Form.Check 
                    type="checkbox"
                    id={`language-${language.value}`}
                    label={language.label}
                    value={language.value}
                    onChange={handleLanguageChange}
                    disabled={loading}
                    className="mb-2"
                  />
                </Col>
              ))}
            </Row>
          </Form.Group>
          
          <Form.Group className="mb-4">
            <Form.Label>What is your experience level?</Form.Label>
            <div>
              {experienceLevels.map(level => (
                <Form.Check
                  key={level.value}
                  type="radio"
                  id={`experience-${level.value}`}
                  label={level.label}
                  value={level.value}
                  checked={experienceLevel === level.value}
                  onChange={(e) => setExperienceLevel(e.target.value)}
                  disabled={loading}
                  inline
                />
              ))}
            </div>
          </Form.Group>
          
          <div className="d-grid">
            <Button 
              variant="primary" 
              type="submit" 
              size="lg"
              disabled={loading}
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
                  Generating Roadmap...
                </>
              ) : (
                'Generate Roadmap'
              )}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default RoadmapGenerator;