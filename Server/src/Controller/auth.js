const User = require('../models/Users');
const jwt = require('jsonwebtoken');
const { generateToken, generateMagicLinkToken } = require('../Middleware/jwt');

// Send magic link email
const sendMagicLink = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Check if user exists or create new user
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({
        email,
        username: email.split('@')[0], 
        role: 'user'
      });
      await user.save();
    }

    // Generate magic link token (in production, send actual email with the magic link)
    const magicLinkToken = generateMagicLinkToken(user._id, email);

    // In production, send email with magic link
    // For now, return the token for testing
    console.log(`Magic link for ${email}: ${process.env.CLIENT_URL}/auth/callback?token=${magicLinkToken}`);

    res.json({
      success: true,
      message: 'Magic link sent successfully',
      // Remove this in production - only for testing
      magicLink: `${process.env.CLIENT_URL}/auth/callback?token=${magicLinkToken}`
    });

  } catch (error) {
    console.error('Error sending magic link:', error);
    res.status(500).json({ error: 'Failed to send magic link' });
  }
};

// Verify magic link
const verifyMagicLink = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ error: 'Token is required' });
    }

    // Verify the magic link token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Generate session token
    const sessionToken = generateToken(user._id);

    // Set HTTP-only cookie with the token
    res.cookie('authToken', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Only use secure in production
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // quick math (7 days)
      path: '/'
    });

    res.json({
      success: true,
      message: 'Magic link verified successfully',
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        role: user.role
      }
    });

  } catch (error) {
    console.error('Error verifying magic link:', error);
    if (error.name === 'TokenExpiredError') {
      res.status(401).json({ error: 'Magic link has expired' });
    } else if (error.name === 'JsonWebTokenError') {
      res.status(401).json({ error: 'Invalid magic link token' });
    } else {
      res.status(500).json({ error: 'Failed to verify magic link' });
    }
  }
};

// Sign out user
const signOut = (req, res) => {
  // Clear the auth cookie
  res.clearCookie('authToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/'
  });
  
  res.json({
    success: true,
    message: 'Signed out successfully'
  });
};

// Get user profile
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        role: user.role,
        createdAt: user.createdAt
      }
    });

  } catch (error) {
    console.error('Error getting user profile:', error);
    res.status(500).json({ error: 'Failed to get user profile' });
  }
};

// Get all users for admin / moderation page 
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json({
      success: true,
      users: users
    });
  }
  catch (error) {
    console.error('Error getting all users:', error);
    res.status(500).json({ error: 'Failed to get all users' });
  }
};

module.exports = {
  sendMagicLink,
  verifyMagicLink,
  signOut,
  getUserProfile
};
