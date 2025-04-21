# AI Mentor Backend

This is the backend server for the AI Mentor application.

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Set up environment variables (optional):
   Create a `.env` file in the backend directory with the following variables:
   ```
   PORT=5001
   MONGO_URI=mongodb://localhost:27017/ai-mentor
   JWT_SECRET=your_secret_key
   ```

3. Make sure MongoDB is running on your local machine or update the MONGO_URI to point to your MongoDB instance.

## Running the Server

To run the server in development mode with nodemon:
```
npm run dev
```

To run the server in production mode:
```
npm start
```

## API Endpoints

### Authentication

- **Register User**: `POST /api/auth/register`
  - Request Body: `{ name, email, password, profile (optional) }`
  - Response: `{ token, user }`

- **Login User**: `POST /api/auth/login`
  - Request Body: `{ email, password }`
  - Response: `{ token, user }`

- **Get Current User**: `GET /api/auth/user`
  - Headers: `x-auth-token: <token>`
  - Response: `{ user }`

- **Update User Profile**: `PUT /api/auth/profile`
  - Headers: `x-auth-token: <token>`
  - Request Body: `{ name (optional), profile (optional), roadmapType (optional) }`
  - Response: `{ user }`# AI Mentor Backend

This is the backend server for the AI Mentor application.

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Set up environment variables (optional):
   Create a `.env` file in the backend directory with the following variables:
   ```
   PORT=5001
   MONGO_URI=mongodb://localhost:27017/ai-mentor
   JWT_SECRET=your_secret_key
   ```

3. Make sure MongoDB is running on your local machine or update the MONGO_URI to point to your MongoDB instance.

## Running the Server

To run the server in development mode with nodemon:
```
npm run dev
```

To run the server in production mode:
```
npm start
```

## API Endpoints

### Authentication

- **Register User**: `POST /api/auth/register`
  - Request Body: `{ name, email, password, profile (optional) }`
  - Response: `{ token, user }`

- **Login User**: `POST /api/auth/login`
  - Request Body: `{ email, password }`
  - Response: `{ token, user }`

- **Get Current User**: `GET /api/auth/user`
  - Headers: `x-auth-token: <token>`
  - Response: `{ user }`

- **Update User Profile**: `PUT /api/auth/profile`
  - Headers: `x-auth-token: <token>`
  - Request Body: `{ name (optional), profile (optional), roadmapType (optional) }`
  - Response: `{ user }`