const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../Middleware/jwt');
const authController = require('../Controller/auth');

// Send magic link email
router.post('/send-magic-link', authController.sendMagicLink);

// Verify magic link
router.post('/verify-magic-link', authController.verifyMagicLink);

// Sign out user
router.post('/signout', authController.signOut);

// Get user profile
router.get('/user-profile', authenticateToken, authController.getUserProfile);

module.exports = router;
