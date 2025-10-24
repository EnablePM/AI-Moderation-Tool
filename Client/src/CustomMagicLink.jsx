import React, { useState } from 'react';
import { Box, Paper, TextField, Button, Typography, CircularProgress } from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { useAuth } from './hooks/useAuth'; 

const CustomMagicLink = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const { sendMagicLink } = useAuth();

  //submits magic link request - email if good 
 const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setMessage('');

  try {
    console.log('Sending magic link payload:', email);
    const response = await sendMagicLink(email);
    
    setMessage('Magic link sent — check your email!');
    
    // For testing, show the magic link. Follow the link to test the magic link as we can send it to email when we are closer to production. plus its easier to test.
    if (response.magicLink) {
      console.log('Magic link for testing:', response.magicLink);
      setMessage(`Too lazy here to send the email so have a link ${response.magicLink}`);
    }
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
      <Paper sx={{ p: 5, borderRadius: 3, maxWidth: 500, width: '100%', textAlign: 'center'}} elevation={6}>
         <Box 
          component="img"
          sx={{
            width: 300,
            mb:3
          }}
          src="/Red_coca_cola logo.png"
          alt="Logo"
          />
        <Typography variant="h5" gutterBottom>
          Sign in to the AI Moderation Tool
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
            size='small'
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }}
          />

          <Button type="submit" variant="contained" color='Coke' fullWidth disabled={loading}>
            {loading ? <CircularProgress size={22} /> : 'Send Magic Link'}
          </Button>
        </form>

        {message && (
          <Typography
            variant="body2"
            sx={{ mt: 2, color: message.startsWith('Too') ? 'success.main' : 'error.main' }}
          >
            {message}
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default CustomMagicLink;
