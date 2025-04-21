import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useAIChat } from '../../contexts/AIChatContext';

const ChatInput = () => {
  const [message, setMessage] = useState('');
  const { sendMessage, loading } = useAIChat();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    try {
      await sendMessage(message.trim());
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="mt-3">
      <InputGroup>
        <Form.Control
          type="text"
          placeholder="Ask your AI mentor a question..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={loading}
          autoFocus
        />
        <Button 
          variant="primary" 
          type="submit" 
          disabled={!message.trim() || loading}
        >
          <FontAwesomeIcon icon={faPaperPlane} />
        </Button>
      </InputGroup>
    </Form>
  );
};

export default ChatInput;