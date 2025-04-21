# Edura Learning Platform

Edura is a learning platform that helps users create personalized learning roadmaps powered by AI. This project includes both a frontend React application and a backend Express server.

## Features

- Generate personalized learning roadmaps using AI
- Save roadmaps to a backend database
- Share roadmaps with other users
- Browse public roadmaps created by the community
- Customize and adapt existing roadmaps
- Visualize learning paths with interactive UI

## Project Structure

The project consists of two main parts:

1. **Frontend (ai-mentor)**: React application with the user interface
2. **Backend (server)**: Express server with MongoDB for data storage

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## Installation

### Backend Setup

1. Navigate to the server directory:
   ```
   cd server
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the server directory with the following variables:
   ```
   PORT=5001
   MONGO_URI=mongodb://localhost:27017/edura
   JWT_SECRET=your_jwt_secret_key_here
   ```

4. Start the server:
   ```
   npm run dev
   ```

### Frontend Setup

1. Navigate to the ai-mentor directory:
   ```
   cd ai-mentor
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the React application:
   ```
   npm start
   ```

## Usage

1. Open your browser and navigate to `http://localhost:3000`
2. Register a new account or log in
3. Create a new roadmap or browse existing public roadmaps
4. Visualize and interact with roadmaps
5. Share your roadmaps with the community

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user
- `GET /api/auth/user` - Get current user data
- `PUT /api/auth/profile` - Update user profile

### Roadmaps

- `GET /api/roadmaps` - Get all roadmaps for the authenticated user
- `GET /api/roadmaps/public` - Get all public roadmaps
- `GET /api/roadmaps/user` - Get all roadmaps for the authenticated user
- `POST /api/roadmaps/search` - Search for roadmaps by criteria
- `GET /api/roadmaps/:id` - Get a roadmap by ID
- `POST /api/roadmaps` - Create a new roadmap
- `PUT /api/roadmaps/:id` - Update a roadmap
- `DELETE /api/roadmaps/:id` - Delete a roadmap
- `PATCH /api/roadmaps/:id/public` - Toggle public status of a roadmap

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.