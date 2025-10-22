// API service functions for backend communication
const API_BASE_URL = 'http://localhost:3000/api';

// a way of doing API request. Kinda want to make this more robust but i'm not sure how to do it. May RTKQ or something like that.
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'API request failed');
    }

    return data;
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
};

// Authentication API functions
export const authAPI = {
  // Send magic link
  sendMagicLink: async (email) => {
    return apiRequest('/auth/send-magic-link', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },

  // Verify magic link
  verifyMagicLink: async (token) => {
    return apiRequest('/auth/verify-magic-link', {
      method: 'POST',
      body: JSON.stringify({ token }),
    });
  },

  // Sign out
  signOut: async () => {
    return apiRequest('/auth/signout', {
      method: 'POST',
    });
  },

  // Get user profile
  getUserProfile: async (token) => {
    return apiRequest('/auth/user-profile', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

// Dashboard API functions
export const dashboardAPI = {
  // Get dashboard stats
  getStats: async () => {
    return apiRequest('/dashboard/stats', {
      method: 'GET',
    });
  },

  // Get user info
  getUserInfo: async (token) => {
    return apiRequest('/dashboard/user-info', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  // Get dashboard overview (this is not used yet)
  getOverview: async (token) => {
    return apiRequest('/dashboard/overview', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

// Token management utilities
export const tokenUtils = {
  // Store token in localStorage
  setToken: (token) => {
    localStorage.setItem('authToken', token);
  },

  // Get token from localStorage
  getToken: () => {
    return localStorage.getItem('authToken');
  },

  // Remove token from localStorage
  removeToken: () => {
    localStorage.removeItem('authToken');
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    const token = localStorage.getItem('authToken');
    return !!token;
  },
};
