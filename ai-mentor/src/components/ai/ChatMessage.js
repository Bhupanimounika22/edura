import { faRobot, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Card } from 'react-bootstrap';

const ChatMessage = ({ message }) => {
  const isUser = message.role === 'user';
  
  // Format timestamp
  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`d-flex mb-3 ${isUser ? 'justify-content-end' : 'justify-content-start'}`}>
      <Card 
        className={`shadow-sm ${isUser ? 'bg-primary text-white' : 'bg-light'}`}
        style={{ maxWidth: '80%', borderRadius: '1rem' }}
      >
        <Card.Body>
          <div className="d-flex align-items-center mb-2">
            <div className="me-2">
              <FontAwesomeIcon icon={isUser ? faUser : faRobot} />
            </div>
            <div className="fw-bold">
              {isUser ? 'You' : 'AI Mentor'}
            </div>
            <div className="ms-auto small text-muted">
              {formatTime(message.timestamp)}
            </div>
          </div>
          <div style={{ whiteSpace: 'pre-wrap' }}>
            {message.content}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ChatMessage;