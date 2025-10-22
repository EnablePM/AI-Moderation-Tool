const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ error: 'Token has expired' });
      } else if (err.name === 'JsonWebTokenError') {
        return res.status(403).json({ error: 'Invalid token' });
      }
      return res.status(403).json({ error: 'Token verification failed' });
    }
    
    req.user = user;
    next();
  });
};

// Token is genarated here
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// Magic link token is genarated here
const generateMagicLinkToken = (userId, email) => {
  return jwt.sign(
    { userId, email },
    process.env.JWT_SECRET,
    { expiresIn: '15m' }
  );
};

module.exports = {
  authenticateToken,
  generateToken,
  generateMagicLinkToken
};

