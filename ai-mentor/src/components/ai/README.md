# AI Mentor Chat Feature

This directory contains the components for the AI Mentor chat feature, which allows users to have interactive conversations with an AI assistant.

## Components

- **AIChat.js**: Main component that wraps the chat interface
- **ChatWindow.js**: Displays the chat messages and input
- **ChatMessage.js**: Individual message component
- **ChatInput.js**: Form for sending messages
- **ConversationList.js**: List of saved conversations

## Context

The AI chat functionality is managed through the `AIChatContext` which provides:

- Message history management
- Conversation tracking
- API communication

## API Integration

The chat feature communicates with a backend API through the `aiService.js` service, which handles:

- Sending messages to the AI
- Retrieving conversation history
- Managing conversations (create, delete, etc.)

## Usage

To use the AI chat feature, navigate to the `/ai-chat` route in the application. Users must be authenticated to access this feature.

## Styling

The chat interface is styled using Bootstrap components and custom CSS in `AIChat.css`.