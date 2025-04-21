import { faGoogle, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faEye, faEyeSlash, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import { Alert, Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import "./Auth.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showDemoOptions, setShowDemoOptions] = useState(false);
  const [selectedDemoProfile, setSelectedDemoProfile] = useState(0);
  
  const { login, demoLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setError("");
      setLoading(true);
      
      // Validate form
      if (!email || !password) {
        throw new Error("Please fill in all fields");
      }
      
      // Call the login function from AuthContext which uses our API
      await login(email, password);
      navigate("/dashboard");
    } catch (error) {
      setError(error.msg || error.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  // Demo profile options
  const demoProfiles = [
    { name: 'Mounika', title: 'Frontend Developer', level: 'Beginner' },
    { name: 'Sai', title: 'Data Scientist', level: 'Intermediate' },
    { name: 'Mohana', title: 'UX Designer', level: 'Advanced' },
    { name: 'Naimish', title: 'DevOps Engineer', level: 'Intermediate' },
    { name: 'Mounika', title: 'Mobile Developer', level: 'Beginner' }
  ];

  const handleDemoLogin = () => {
    if (!showDemoOptions) {
      // Show demo options first
      setShowDemoOptions(true);
    } else {
      // Use the demoLogin function with the selected profile index
      demoLogin(selectedDemoProfile);
      
      // Navigate to home page for demo users
      navigate("/");
    }
  };
  
  const handleSelectDemoProfile = (index) => {
    setSelectedDemoProfile(index);
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6} xl={5}>
          <Card className="auth-card">
            <Card.Body className="p-5">
              <div className="text-center mb-4">
                <h2 className="auth-title">Welcome Back</h2>
                <p className="text-muted">Sign in to continue to AI Mentor</p>
              </div>
              
              {error && <Alert variant="danger">{error}</Alert>}
              
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-4">
                  <Form.Label>Email Address</Form.Label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FontAwesomeIcon icon={faEnvelope} />
                    </span>
                    <Form.Control
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </Form.Group>
                
                <Form.Group className="mb-4">
                  <Form.Label className="d-flex justify-content-between">
                    <span>Password</span>
                    <Link to="/forgot-password" className="text-decoration-none small">
                      Forgot password?
                    </Link>
                  </Form.Label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FontAwesomeIcon icon={faLock} />
                    </span>
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <Button 
                      variant="outline-secondary"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                    </Button>
                  </div>
                </Form.Group>
                
                <Form.Group className="mb-4">
                  <Form.Check
                    type="checkbox"
                    label="Remember me"
                    id="remember-checkbox"
                  />
                </Form.Group>
                
                <div className="d-grid mb-4">
                  <Button 
                    variant="primary" 
                    type="submit" 
                    size="lg"
                    disabled={loading}
                  >
                    {loading ? "Signing In..." : "Sign In"}
                  </Button>
                </div>
                
                <div className="text-center mb-4">
                  <span className="divider-text">or sign in with</span>
                </div>
                
                <Row className="social-buttons mb-4">
                  <Col xs={6}>
                    <a href="http://localhost:5000/api/auth/google" className="btn btn-outline-danger w-100">
                      <FontAwesomeIcon icon={faGoogle} className="me-2" />
                      Google
                    </a>
                  </Col>
                  <Col xs={6}>
                    <a href="http://localhost:5000/api/auth/linkedin" className="btn btn-outline-primary w-100">
                      <FontAwesomeIcon icon={faLinkedin} className="me-2" />
                      LinkedIn
                    </a>
                  </Col>
                </Row>
                
                <div className="text-center mb-4">
                  {showDemoOptions ? (
                    <>
                      <h5 className="mb-3">Select a Demo Profile</h5>
                      <div className="demo-profiles-container mb-3">
                        {demoProfiles.map((profile, index) => (
                          <Card 
                            key={index} 
                            className={`demo-profile-card mb-2 ${selectedDemoProfile === index ? 'selected' : ''}`}
                            onClick={() => handleSelectDemoProfile(index)}
                            style={{ 
                              cursor: 'pointer', 
                              border: selectedDemoProfile === index ? '2px solid #007bff' : '1px solid #dee2e6',
                              padding: '10px'
                            }}
                          >
                            <div className="d-flex align-items-center">
                              <div className="demo-profile-avatar me-3" style={{ 
                                width: '40px', 
                                height: '40px', 
                                borderRadius: '50%', 
                                backgroundColor: `hsl(${index * 60}, 70%, 60%)`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontWeight: 'bold'
                              }}>
                                {profile.name.charAt(0)}
                              </div>
                              <div className="text-start">
                                <h6 className="mb-0">{profile.name}</h6>
                                <small className="text-muted">{profile.title} • {profile.level}</small>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                      <Button 
                        variant="success" 
                        onClick={handleDemoLogin}
                        className="w-100"
                      >
                        Continue with Selected Profile
                      </Button>
                    </>
                  ) : (
                    <Button 
                      variant="success" 
                      onClick={handleDemoLogin}
                      className="w-100"
                    >
                      Try Demo Account
                    </Button>
                  )}
                </div>
              </Form>
            </Card.Body>
          </Card>
          
          <div className="text-center mt-4">
            <p className="mb-0">
              Do not have an account? <Link to="/register" className="text-decoration-none fw-bold">Sign Up</Link>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
