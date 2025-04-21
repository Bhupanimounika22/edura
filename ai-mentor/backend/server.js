const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config/config');
const authRoutes = require('./routes/auth');

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(config.mongoURI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Connection Error:', err));

// Routes
app.use('/api/auth', authRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('AI Mentor API is running');
});

// Start server
const PORT = config.port || 5002; // Changed from 5001 to 5002 to avoid port conflict
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Try using a different port.`);
    process.exit(1);
  } else {
    console.error('Server error:', err);
  }
});