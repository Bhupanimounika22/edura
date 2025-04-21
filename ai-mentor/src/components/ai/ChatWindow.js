import React, { useEffect, useRef } from 'react';
import { Card, Spinner } from 'react-bootstrap';
import { useAIChat } from '../../contexts/AIChatContext';
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';

const ChatWindow = () => {
  const { messages, loading, currentConversation } = useAIChat();
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="chat-window d-flex flex-column h-100">
      <Card className="flex-grow-1 mb-3 border-0 shadow-sm">
        <Card.Header className="bg-primary text-white">
          <h5 className="mb-0">
            {currentConversation?.title || 'AI Mentor Chat'}
          </h5>
        </Card.Header>
        <Card.Body className="chat-messages" style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 300px)' }}>
          {messages.length === 0 ? (
            <div className="text-center text-muted py-5">
              <p>No messages yet. Start a conversation with your AI mentor!</p>
              <p className="small">
                Ask about coding problems, career advice, or learning resources.
              </p>
            </div>
          ) : (
            <>
              {messages.map(message => (
                <ChatMessage key={message.id} message={message} />
              ))}
              {loading && (
                <div className="text-center my-3">
                  <Spinner animation="border" variant="primary" size="sm" />
                </div>
              )}
              <div ref={messagesEndRef} />
            </>
          )}
        </Card.Body>
      </Card>
      <ChatInput />
    </div>
  );
};

export default ChatWindow;