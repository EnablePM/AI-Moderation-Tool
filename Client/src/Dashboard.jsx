import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import { useAuth } from './hooks/useAuth';
import { dashboardAPI } from './services/api';
import Navbar from './components/navbar';
import CardGrid from './components/CardGrid';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import FilterBar from './components/FilterBar';
import StackedLineChartIcon from '@mui/icons-material/StackedLineChart';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import GppBadOutlinedIcon from '@mui/icons-material/GppBadOutlined';
import DoneAllOutlinedIcon from '@mui/icons-material/DoneAllOutlined';

const Dashboard = () => {
  const { user } = useAuth();
  const [tabValue, setTabValue] = useState('1');
  const [stats, setStats] = useState({
    totalTrends: 0,
    highRiskTrends: 0,
    moderationRules: 0,
    activeSources: 0
  });
  const [loading, setLoading] = useState(true);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Fetch dashboard data from backend
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const response = await dashboardAPI.getStats();
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        // Fallback to default values if API fails (for testing purposes as this is terribly handled)
        setStats({
          totalTrends: 150,
          highRiskTrends: 45,
          moderationRules: 60,
          activeSources: 45
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', }}>
      <Navbar />
      
      <Box sx={{ 
        flexGrow: 1, 
        px: { xs: 2, sm: 3, md: 6, lg: 12, xl:18 },
        pt:5,
        width: '100%', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: 2 
      }}>
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
                Email: {user.email || 'N/A'}
              </Typography>
              <Typography variant="body2">
                Username: {user.username || 'N/A'}
              </Typography>
              <Typography variant="body2">
                User ID: {user.id}
              </Typography>
              <Typography variant="body2">
                User Role: {user.role || 'N/A'}
              </Typography>
            </Box>
          )}
        </Paper>
        <Box>
          <Stack direction="row" spacing={2}>
            <Paper sx={{ p: 3, flex: 1 }} elevation={3}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap:1, mb:1 }}>
                <Typography variant="h6" >Total Trends</Typography>
                <StackedLineChartIcon sx={{ fontSize: 25, color: 'pill.danger' }}/>
              </Box>
              <Typography variant="h4">{loading ? '...' : stats.totalTrends}</Typography>
            </Paper>
            <Paper sx={{ p: 3, flex: 1}} elevation={3}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap:1, mb:1 }}>
              <Typography variant="h6">High Risk Trends</Typography>
              <WarningAmberIcon sx={{ fontSize: 25, color: 'pill.danger' }}/>
              </Box>
               <Typography variant="h4">{loading ? '...' : stats.highRiskTrends}</Typography>
            </Paper>
            <Paper sx={{ p: 3, flex: 1 }} elevation={3}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap:1, mb:1}}> 
                <Typography variant="h6">Moderation Rules</Typography>
                <GppBadOutlinedIcon sx={{ fontSize: 25, color: 'pill.danger' }}/>
              </Box>
              <Typography variant="h4">{loading ? '...' : stats.moderationRules}</Typography>
            </Paper>
            <Paper sx={{ p: 3, flex: 1 }} elevation={3}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap:1, mb:1}}>
                <Typography variant="h6">Active Sources</Typography>
                <DoneAllOutlinedIcon sx={{ fontSize: 25, color: 'pill.danger' }}/>  
              </Box>
              <Typography variant="h4">{loading ? '...' : stats.activeSources}</Typography>
            </Paper>
          </Stack>
        </Box>

        <TabContext value={tabValue}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', backgroundColor: 'background.paper', borderRadius: 1, width: '100%' }}>
            <TabList
              onChange={handleTabChange}
              aria-label="dashboard tabs"
              variant="fullWidth"            
              sx={{ width: '100%' }}
            >
              <Tab label="Clusters" value="1" sx={{ minWidth: 0 }} />
              <Tab label="Moderation" value="2" sx={{ minWidth: 0 }} />
            </TabList>
          </Box>

          <TabPanel value="1" sx={{ p: 0, pt:2, width: '100%' }}>
            <FilterBar />
            <CardGrid />
          </TabPanel>

          <TabPanel value="2" sx={{ p: 0, pt:2, width: '100%' }}>
            {/* Moderation content will go here soon*/}
            <Typography variant="h6" sx={{ mb: 2 }}>Moderation</Typography>
            <Paper sx={{ p: 2 }}>
              {/* The list where all the moderation rules will go */}
              <Typography variant="body2">Moderation panel content goes here.</Typography>
            </Paper>
          </TabPanel>
        </TabContext>
      </Box>
    </Box>
  );
};

export default Dashboard;
// ...existing code...