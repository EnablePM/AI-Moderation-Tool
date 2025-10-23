const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

// configz
const corsOptions = require('./src/Config/corsOptions');
const connectDB = require('./src/Config/db');

// routes init
const authRoutes = require('./src/Routes/auth');
const dashboardRoutes = require('./src/Routes/dashboard');
const adminRoutes = require('./src/Routes/admin');

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/admin', adminRoutes);
// Health check for endpoints
app.get('/', (req, res) => {
  res.json({
    message: 'AI Moderation Tool Backend Server',
    status: 'running',
    timestamp: new Date().toISOString()
  });
});

// Start server
const startServer = async () => {
  try {
    // Connect to database
    await connectDB();
    
    // Start listening
    app.listen(port, () => {
      console.log(`🚀 Server is running on port ${port}`);
      console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🔗 API Base URL: http://localhost:${port}/api`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// powah
startServer();