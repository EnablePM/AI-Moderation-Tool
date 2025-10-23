// API service functions for backend communication
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// a way of doing API request. Kinda want to make this more robust but i'm not sure how to do it. May RTKQ or something like that.
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    credentials: 'include', // Include cookies in requests
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
  getUserProfile: async () => {
    return apiRequest('/auth/user-profile', {
      method: 'GET',
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
  getUserInfo: async () => {
    return apiRequest('/dashboard/user-info', {
      method: 'GET',
    });
  },

  // Get dashboard overview (this is not used yet)
  getOverview: async () => {
    return apiRequest('/dashboard/overview', {
      method: 'GET',
    });
  },
};

// Token management utilities (legacy - now using HTTP-only cookies)
export const tokenUtils = {
  // Remove any existing localStorage tokens (cleanup for security)
  removeToken: () => {
    localStorage.removeItem('authToken');
  },

  // Clear all auth-related localStorage items
  clearAllAuthData: () => {
    localStorage.removeItem('authToken');
    // Add any other auth-related keys here if needed
  },
};
