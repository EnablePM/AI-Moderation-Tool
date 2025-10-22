import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { CircularProgress, Box } from '@mui/material';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // Not authenticated, no no to the dashboard
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // User is authenticated, render the protected component (dashboard)
  return children;
};

export default ProtectedRoute;

