# AI Mentor

A personalized learning platform with AI-powered roadmaps and career guidance.

## Environment Setup

This project uses environment variables to manage API keys and configuration. Follow these steps to set up your environment:

### 1. Create a `.env` file

Copy the `.env.example` file to a new file named `.env`:

```bash
cp .env.example .env
```

### 2. Add your API keys

Open the `.env` file and add your API keys:

```
# API Keys
REACT_APP_GEMINI_API_KEY=your-gemini-api-key-goes-here

# Service URLs
REACT_APP_API_BASE_URL=http://localhost:5000/api
REACT_APP_AUTH_URL=http://localhost:5000/api/auth

# Feature Flags
REACT_APP_ENABLE_ANALYTICS=false

# Environment
NODE_ENV=development
```

### 3. Getting a Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create an account or sign in with your Google account
3. Create a new API key
4. Copy the key and paste it in your `.env` file

### 4. Environment Variables Usage

The environment variables are accessed through the `config.js` utility:

```javascript
import { GEMINI_API_KEY } from '../utils/config';

// Use the key in your code
console.log(GEMINI_API_KEY);
```

## Available AI Services

- `geminiService.js` - Service for interacting with the Google Gemini API
- `directAiService.js` - Service for using Gemini API directly from the client

### Example Usage

```javascript
import directAiService from '../services/directAiService';

// Generate a response
const response = await directAiService.generateResponse('What is machine learning?');

// Generate a roadmap
const roadmap = await directAiService.generateRoadmap(userProfile);

// Generate career advice
const advice = await directAiService.generateCareerAdvice(userProfile, 'How can I transition to a senior role?');
```

## Security Notes

- Never commit your `.env` file to version control
- The `.env` file is included in `.gitignore` to prevent accidental commits
- Use environment variables for all sensitive information
- For production, set up proper environment variables in your hosting platform

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Project Structure

This project consists of both a frontend React application and a backend Node.js server:

- **Frontend**: React application with AI-powered features
- **Backend**: Express server with MongoDB for user authentication and data storage

## Project Structure

This project consists of both a frontend React application and a backend Node.js server:

- **Frontend**: React application with AI-powered features
- **Backend**: Express server with MongoDB for user authentication and data storage

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the frontend app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm run server`

Runs the backend server in development mode with nodemon.\
The server will be available at [http://localhost:5002](http://localhost:5002).

### `npm run dev`

Runs both the frontend and backend concurrently in development mode.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## Backend Setup

The backend requires MongoDB to be installed and running. See the [backend README](./backend/README.md) for detailed setup instructions.

1. Install backend dependencies:
   ```
   cd backend
   npm install
   ```

2. Start the backend server:
   ```
   npm run dev
   ```### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

## Backend Setup

The backend requires MongoDB to be installed and running. See the [backend README](./backend/README.md) for detailed setup instructions.

1. Install backend dependencies:
   ```
   cd backend
   npm install
   ```

2. Start the backend server:
   ```
   npm run dev
   ```

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
