// ...existing code...
const allowedCors = require('./allowedCors');

const corsOptions = {
  origin: allowedCors,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

module.exports = corsOptions;