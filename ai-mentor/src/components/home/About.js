import {
    faHandshake,
    faLightbulb,
    faRoad,
    faRobot,
    faUsers
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './About.css';

// Import placeholder team images
import {
    team1 as teamMember1,
    team2 as teamMember2,
    team3 as teamMember3,
    team4 as teamMember4
} from '../../assets/images/placeholder';

const About = () => {
  const team = [
    {
      name: 'Alex Johnson',
      role: 'Founder & CEO',
      image: teamMember1,
      bio: 'Former Google engineer with a passion for education and AI. Alex founded AI Mentor to democratize career guidance.'
    },
    {
      name: 'Sophia Chen',
      role: 'CTO',
      image: teamMember2,
      bio: 'AI researcher with a PhD from MIT. Sophia leads our technical team and oversees the development of our recommendation algorithms.'
    },
    {
      name: 'Marcus Williams',
      role: 'Head of Content',
      image: teamMember3,
      bio: 'Former career coach with 10+ years of experience. Marcus ensures our roadmaps and resources are accurate and effective.'
    },
    {
      name: 'Priya Patel',
      role: 'UX Director',
      image: teamMember4,
      bio: 'Award-winning designer who previously worked at Airbnb. Priya is dedicated to creating intuitive and accessible user experiences.'
    }
  ];

  const values = [
    {
      icon: faLightbulb,
      title: 'Innovation',
      description: 'We constantly push the boundaries of what is possible with AI and education technology.'
    },
    {
      icon: faHandshake,
      title: 'Accessibility',
      description: 'We believe quality career guidance should be available to everyone, regardless of background.'
    },
    {
      icon: faUsers,
      title: 'Community',
      description: 'We foster a supportive community where users can learn, grow, and connect with each other.'
    },
    {
      icon: faRoad,
      title: 'Personalization',
      description: 'We recognize that every learning journey is unique and tailor our guidance to individual needs.'
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="about-hero-section text-white">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <h1 className="display-4 fw-bold mb-4">Our Mission</h1>
              <p className="lead mb-5">
                We're on a mission to democratize career guidance and make personalized learning paths accessible to everyone. 
                Using AI, we're revolutionizing how people discover, learn, and advance in their careers.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Story Section */}
      <section className="py-5">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="mb-4 mb-lg-0">
              <div className="about-image-container">
                <div className="about-image-box bg-primary"></div>
                <div className="about-image-box bg-secondary"></div>
                <div className="about-image-icon">
                  <FontAwesomeIcon icon={faRobot} size="3x" className="text-white" />
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <h2 className="section-title">Our Story</h2>
              <p className="mb-4">
                AI Mentor was born from a simple observation: despite the abundance of learning resources available online, 
                many people struggle to find a clear path forward in their careers. They are overwhelmed by options and unsure 
                which skills to prioritize.
              </p>
              <p className="mb-4">
                Founded in 2023, we set out to solve this problem by combining artificial intelligence with expert career guidance. 
                Our platform analyzes your interests, goals, and current skills to create personalized roadmaps that guide you 
                step-by-step toward your dream career.
              </p>
              <p>
                Today, we are proud to help thousands of users navigate their learning journeys, discover relevant opportunities, 
                and achieve their career aspirations.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Values Section */}
      <section className="py-5 bg-light">
        <Container>
          <div className="text-center mb-5">
            <h2 className="section-title">Our Values</h2>
            <p className="section-subtitle">The principles that guide everything we do</p>
          </div>
          <Row>
            {values.map((value, index) => (
              <Col md={6} lg={3} key={index} className="mb-4">
                <Card className="value-card h-100">
                  <Card.Body className="text-center p-4">
                    <div className="value-icon mb-3">
                      <FontAwesomeIcon icon={value.icon} size="2x" />
                    </div>
                    <Card.Title className="mb-3">{value.title}</Card.Title>
                    <Card.Text className="text-muted">
                      {value.description}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Team Section */}
      <section className="py-5">
        <Container>
          <div className="text-center mb-5">
            <h2 className="section-title">Meet Our Team</h2>
            <p className="section-subtitle">The passionate people behind AI Mentor</p>
          </div>
          <Row>
            {team.map((member, index) => (
              <Col md={6} lg={3} key={index} className="mb-4">
                <Card className="team-card h-100">
                  <div className="team-image-container">
                    <Card.Img variant="top" src={member.image} className="team-image" />
                  </div>
                  <Card.Body className="text-center p-4">
                    <Card.Title className="mb-1">{member.name}</Card.Title>
                    <div className="team-role mb-3">{member.role}</div>
                    <Card.Text className="text-muted">
                      {member.bio}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="py-5 bg-light">
        <Container>
          <div className="text-center mb-5">
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle">Answers to common questions about AI Mentor</p>
          </div>
          <Row className="justify-content-center">
            <Col lg={8}>
              <div className="accordion" id="faqAccordion">
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingOne">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                      How does AI Mentor create personalized roadmaps?
                    </button>
                  </h2>
                  <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      Our AI analyzes your interests, current skills, goals, and learning preferences to create a customized learning path. 
                      We combine machine learning algorithms with expert-designed curriculum frameworks to ensure your roadmap is both 
                      personalized and pedagogically sound.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingTwo">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                      Is AI Mentor free to use?
                    </button>
                  </h2>
                  <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      We offer a free tier that provides access to basic roadmaps and resources. For more advanced features, 
                      personalized coaching, and premium resources, we offer affordable subscription plans. Our goal is to make 
                      quality career guidance accessible to everyone.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingThree">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                      How often are the roadmaps and resources updated?
                    </button>
                  </h2>
                  <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      We continuously update our content to reflect the latest industry trends, technologies, and best practices. 
                      Our team of experts reviews and refreshes roadmaps quarterly, while new resources and job listings are added daily.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingFour">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                      Can I change my interests or goals after creating my account?
                    </button>
                  </h2>
                  <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      Absolutely! We understand that interests and goals evolve over time. You can update your profile and preferences 
                      at any time, and your roadmap will adjust accordingly. We encourage users to revisit their goals periodically as 
                      they progress in their learning journey.
                    </div>
                  </div>
                </div>
              </div>
            </Col>
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

export default About;