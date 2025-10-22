const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../Middleware/jwt');
const dashboardController = require('../Controller/dashboard');

// Get dashboard statistics (to be set up)
router.get('/stats', dashboardController.getDashboardStats);

// Get user information for dashboard 
router.get('/user-info', authenticateToken, dashboardController.getUserInfo);

// Get dashboard overview data
router.get('/overview', authenticateToken, dashboardController.getDashboardOverview);

module.exports = router;
