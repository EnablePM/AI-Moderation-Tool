import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '@stackframe/react';
import { CircularProgress, Box } from '@mui/material';

const ProtectedRoute = ({ children }) => {
  const user = useUser();

  // Show loading state while checking authentication
  if (user === undefined) {
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

  // Not authenticated, redirect to login
  if (user === null) {
    return <Navigate to="/" replace />;
  }

  // User is authenticated, render the protected component
  return children;
};

export default ProtectedRoute;

