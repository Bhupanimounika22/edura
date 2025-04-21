import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button, ListGroup } from 'react-bootstrap';
import { useAIChat } from '../../contexts/AIChatContext';

const ConversationList = () => {
  const { 
    conversations, 
    currentConversation, 
    switchConversation, 
    startNewConversation,
    deleteConversation,
    loading
  } = useAIChat();

  // Format date for display
  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  };

  return (
    <div className="conversation-list">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0">Conversations</h5>
        <Button 
          variant="primary" 
          size="sm" 
          onClick={startNewConversation}
          disabled={loading}
        >
          <FontAwesomeIcon icon={faPlus} /> New
        </Button>
      </div>

      {conversations.length === 0 ? (
        <div className="text-center text-muted py-4">
          No conversations yet. Start a new one!
        </div>
      ) : (
        <ListGroup>
          {conversations.map(conversation => (
            <ListGroup.Item 
              key={conversation.id}
              active={currentConversation?.id === conversation.id}
              action
              className="d-flex justify-content-between align-items-center"
              onClick={() => switchConversation(conversation.id)}
            >
              <div className="conversation-info">
                <div className="conversation-title">
                  {conversation.title || 'New Conversation'}
                </div>
                <small className="text-muted">
                  {formatDate(conversation.updatedAt || conversation.createdAt)}
                </small>
              </div>
              <Button 
                variant={currentConversation?.id === conversation.id ? "light" : "outline-danger"}
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteConversation(conversation.id);
                }}
                disabled={loading}
              >
                <FontAwesomeIcon icon={faTrash} />
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
};

export default ConversationList;