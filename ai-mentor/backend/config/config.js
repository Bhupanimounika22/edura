module.exports = {
  port: process.env.PORT || 50022,
  mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27017/ai-mentor',
  jwtSecret: process.env.JWT_SECRET || 'ai-mentor-secret-key',
  jwtExpiration: '24h'
};