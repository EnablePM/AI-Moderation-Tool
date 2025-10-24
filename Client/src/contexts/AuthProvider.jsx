import React, { useState, useEffect } from 'react';
import { authAPI, tokenUtils } from '../services/api';
import { AuthContext } from './AuthContext';

// AuthProvider is a context provider for the auth context. may be a better way of handling this but as for now this is secure and works.
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  // Check for existing session on app load using HTTP-only cookies
  useEffect(() => {
    const checkAuth = async () => {
      // Clear any existing localStorage tokens for security
      tokenUtils.clearAllAuthData();
      
      console.log('Scanning.... if you see this, you are not authenticated yet');
      const response = await authAPI.checkSession();
      
      if (response?.success && response.user) {
        setUser(response.user);
        setToken('cookie-based'); 
        console.log(' User authenticated successfully');
      } else {
        // No active session - this is normal for unauthenticated users
        console.log('ℹNo active session found - user needs to auth');
        tokenUtils.removeToken();
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
    
    // Set user data (token is stored in HTTP-only cookie by server)
    setToken('cookie-based'); // Indicate we're using cookie-based auth
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
