import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { stackClientApp } from './stack/client';
import { CircularProgress, Box, Typography } from '@mui/material';

const AuthCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [error, setError] = useState(false);
  
  // Stack Auth sends the code as a query parameter
  const code = searchParams.get('code');
  
  useEffect(() => {
    console.log('AuthCallback - URL search params:', searchParams.toString());
    console.log('AuthCallback - Code:', code);
    
    if (!code) {
      console.error('No code in URL, redirecting to login');
      navigate('/', { replace: true });
      return;
    }

    handleMagicLinkVerification(code);
  }, [code, navigate]);

  const handleMagicLinkVerification = async (otpCode) => {
    try {
      console.log('🔐 Starting magic link verification...');
      
      // Exchange OTP code for Stack Auth session
      console.log('📝 Signing in with code...');
      await stackClientApp.signInWithMagicLink(otpCode);
      
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

