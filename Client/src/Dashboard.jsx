import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { useUser } from '@stackframe/react';
import Navbar from './components/navbar';
import Card from './components/Card';

const Dashboard = () => {
  const user = useUser();

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      
      <Box sx={{ flexGrow: 1, p: 4, width: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Paper sx={{ p: 4, borderRadius: 2, height: '100%' }} elevation={3}>
          <Typography variant="h4" gutterBottom>
            This is the dashboard! 
          </Typography>
          
          <Typography variant="body1" color="text.secondary" paragraph>
            Yaya it worked.
          </Typography>

          {user && (
            <Box sx={{ mt: 3, p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                User Information:
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Email: {user.primaryEmail || 'N/A'}
              </Typography>
              <Typography variant="body2">
                User ID: {user.id}
              </Typography>
            </Box>
          )}
        </Paper>
        <Card />
      </Box>
    </Box>
  );
};

export default Dashboard;

