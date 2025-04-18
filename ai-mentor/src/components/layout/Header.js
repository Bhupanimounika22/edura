
import { faCog, faRobot, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react';
import { Button, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import './Header.css';

const Header = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="navbar-custom sticky-top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <FontAwesomeIcon icon={faRobot} className="me-2 text-primary" size="lg" />
          <span className="brand-text">Edura</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            {currentUser ? (
              <>
                <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                <Nav.Link as={Link} to="/jobs">Jobs & Internships</Nav.Link>
                <Nav.Link as={Link} to="/resources">Resources</Nav.Link>
                <NavDropdown title={
                  <span>
                    <FontAwesomeIcon icon={faUser} className="me-1" />
                    {currentUser.name || 'Profile'}
                  </span>
                } id="basic-nav-dropdown">
                  <NavDropdown.Item as={Link} to="/profile">
                    <FontAwesomeIcon icon={faUser} className="me-2" />
                    My Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/settings">
                    <FontAwesomeIcon icon={faCog} className="me-2" />
                    Settings
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>
                    <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/about">About</Nav.Link>
                <Nav.Link as={Link} to="/login">
                  <Button variant="outline-primary" size="sm">Login</Button>
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  <Button variant="primary" size="sm">Sign Up</Button>
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;