import React from 'react';
import { Alert, Col, Container, Row } from 'react-bootstrap';
import { AIChatProvider, useAIChat } from '../../contexts/AIChatContext';
import './AIChat.css';
import ChatWindow from './ChatWindow';
import ConversationList from './ConversationList';
import DemoUserBanner from './DemoUserBanner';

const AIChatContent = () => {
  const { error } = useAIChat();

  return (
    <Container fluid className="h-100 py-4">
      <DemoUserBanner />
      {error && (
        <Alert variant="danger" className="mb-4">
          {error}
        </Alert>
      )}
      <Row className="h-100">
        <Col md={3} className="mb-3 mb-md-0">
          <ConversationList />
        </Col>
        <Col md={9}>
          <ChatWindow />
        </Col>
      </Row>
    </Container>
  );
};

const AIChat = () => {
  return (
    <AIChatProvider>
      <AIChatContent />
    </AIChatProvider>
  );
};

export default AIChat;