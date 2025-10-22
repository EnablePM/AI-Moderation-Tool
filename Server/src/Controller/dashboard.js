const User = require('../models/Users');

// Get dashboard statistics
const getDashboardStats = async (req, res) => {
  try {
    // In a real application, these would come from your database
    // For now, returning mock data that matches your frontend
    const stats = {
      totalTrends: 150,
      highRiskTrends: 45,
      moderationRules: 60,
      activeSources: 45,
      lastUpdated: new Date().toISOString()
    };

    res.json({
      success: true,
      data: stats
    });

  } catch (error) {
    console.error('Error getting dashboard stats:', error);
    res.status(500).json({ error: 'Failed to get dashboard statistics' });
  }
};

// Get user information for dashboard
const getUserInfo = async (req, res) => {
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
        lastLogin: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Error getting user info:', error);
    res.status(500).json({ error: 'Failed to get user information' });
  }
};

// Get dashboard overview data
const getDashboardOverview = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Combined dashboard data
    const overview = {
      stats: {
        totalTrends: 150,
        highRiskTrends: 45,
        moderationRules: 60,
        activeSources: 45
      },
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        role: user.role
      },
      lastUpdated: new Date().toISOString()
    };

    res.json({
      success: true,
      data: overview
    });

  } catch (error) {
    console.error('Error getting dashboard overview:', error);
    res.status(500).json({ error: 'Failed to get dashboard overview' });
  }
};

module.exports = {
  getDashboardStats,
  getUserInfo,
  getDashboardOverview
};
