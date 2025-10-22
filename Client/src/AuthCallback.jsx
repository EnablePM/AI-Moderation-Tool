import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CircularProgress, Box, Typography } from '@mui/material';
import { useAuth } from './hooks/useAuth';

const AuthCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [error, setError] = useState(false);
  const { verifyMagicLink } = useAuth();
  
  // Stack Auth sends the code as a query parameter
  const token = searchParams.get('token');
  
  useEffect(() => {
    const handleMagicLinkVerification = async (magicLinkToken) => {
      try {
        console.log('🔐 Starting magic link verification...');
        
        // Exchange magic link token for session token in da backend
        console.log('📝 Verifying magic link with backend...');
        await verifyMagicLink(magicLinkToken);
        
        console.log('✅ Successfully signed in, redirecting to dashboard...');
        navigate('/dashboard', { replace: true });
      } catch (error) {
        console.error('❌ Magic link verification failed:', error);
        setError(true);
        setTimeout(() => {
          navigate('/', { replace: true });
        }, 2000);
      }
    };

    console.log('AuthCallback - URL search params:', searchParams.toString());
    console.log('AuthCallback - Token:', token);
    
    if (!token) {
      console.error('No token in URL, redirecting to login');
      navigate('/', { replace: true });
      return;
    }

    handleMagicLinkVerification(token);
  }, [token, navigate, searchParams, verifyMagicLink]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        gap: 2,
      }}
    >
      <CircularProgress size={48} />
      <Typography variant="body1" color={error ? 'error' : 'text.secondary'}>
        {error ? 'Sign in failed. Redirecting...' : 'Completing sign in...'}
      </Typography>
    </Box>
  );
};

export default AuthCallback;

