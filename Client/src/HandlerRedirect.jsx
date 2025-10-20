import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CircularProgress, Box, Typography } from '@mui/material';

const HandlerRedirect = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // Get the code from the URL
    const code = searchParams.get('code');
    
    console.log('HandlerRedirect - Caught /handler route, redirecting to /auth/callback');
    console.log('Code:', code);
    
    if (code) {
      // Redirect to our custom callback with the code
      navigate(`/auth/callback?code=${code}`, { replace: true });
    } else {
      console.error('No code found in handler URL');
      navigate('/', { replace: true });
    }
  }, [searchParams, navigate]);

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
      <Typography variant="body1" color="text.secondary">
        Processing magic link...
      </Typography>
    </Box>
  );
};

export default HandlerRedirect;

