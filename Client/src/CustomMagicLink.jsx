import React, { useState } from 'react';
import { Box, Paper, TextField, Button, Typography, CircularProgress } from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { stackClientApp } from './stack/client'; 

const CustomMagicLink = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  //submits magic link request - email if good 
 const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setMessage('');

  try {
    console.log('Sending magic link payload:', email);
    //send magic link using stackClientApp - not email sign in like a dumbass (Thats me)
    await stackClientApp.sendMagicLinkEmail(email, {
  redirectTo: `${window.location.origin}/auth/callback`,
});

    setMessage('✅ Magic link sent — check your email!');
  } catch (err) {
    console.error('Error sending magic link:', err);
    setMessage('❌ Failed to send magic link. Please try again.');
  } finally {
    setLoading(false);
  }
};


  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 2,
      }}
    >
      <Paper sx={{ p: 5, borderRadius: 3, maxWidth: 420, width: '100%', textAlign: 'center' }} elevation={6}>
        <MailOutlineIcon sx={{ fontSize: 52, color: 'primary.main', mb: 1 }} />
        <Typography variant="h5" gutterBottom>
          Sign in with Magic Link
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={3}>
          Enter your email to receive a login link.
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Email address"
            type="email"
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }}
          />

          <Button type="submit" variant="contained" fullWidth disabled={loading}>
            {loading ? <CircularProgress size={22} /> : 'Send Magic Link'}
          </Button>
        </form>

        {message && (
          <Typography
            variant="body2"
            sx={{ mt: 2, color: message.startsWith('✅') ? 'success.main' : 'error.main' }}
          >
            {message}
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default CustomMagicLink;
