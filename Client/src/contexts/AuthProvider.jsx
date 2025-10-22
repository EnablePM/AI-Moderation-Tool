import React, { useState, useEffect } from 'react';
import { authAPI, tokenUtils } from '../services/api';
import { AuthContext } from './AuthContext';

// AuthProvider is a context provider for the auth context. may be a better way of handling this but as for now this is secure and works.
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  // Check for existing token on app load AKA checks if the user is already logged in (kinda)
  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = tokenUtils.getToken();
      if (storedToken) {
        try {
          const response = await authAPI.getUserProfile(storedToken);
          if (response.success && response.user) {
            setUser(response.user);
            setToken(storedToken);
          } else {
            // Invalid response, clear token
            tokenUtils.removeToken();
          }
        } catch (error) {
          console.error('Token validation failed:', error);
          tokenUtils.removeToken();
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  // Send magic link
  const sendMagicLink = async (email) => {
    const response = await authAPI.sendMagicLink(email);
    return response;
  };

  // Verify magic link and sign in
  const verifyMagicLink = async (magicLinkToken) => {
    const response = await authAPI.verifyMagicLink(magicLinkToken);
    
    // Store token and user data
    tokenUtils.setToken(response.token);
    setToken(response.token);
    setUser(response.user);
    
    return response;
  };

  // Sign out
  const signOut = async () => {
    try {
      await authAPI.signOut();
    } catch (error) {
      console.error('Sign out error:', error);
    } finally {
      // Clear local state regardless of API call success
      tokenUtils.removeToken();
      setToken(null);
      setUser(null);
    }
  };

  const value = {
    user,
    token,
    loading,
    sendMagicLink,
    verifyMagicLink,
    signOut,
    isAuthenticated: !!user && !!token,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
