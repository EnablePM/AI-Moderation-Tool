import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import { useUser } from '@stackframe/react';
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
  const user = useUser();

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
                Email: {user.primaryEmail || 'N/A'}
              </Typography>
              <Typography variant="body2">
                User ID: {user.id}
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
              <Typography variant="h4">150</Typography>
            </Paper>
            <Paper sx={{ p: 3, flex: 1}} elevation={3}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap:1, mb:1 }}>
              <Typography variant="h6">High Risk Trends</Typography>
              <WarningAmberIcon sx={{ fontSize: 25, color: 'pill.danger' }}/>
              </Box>
               <Typography variant="h4">45</Typography>
            </Paper>
            <Paper sx={{ p: 3, flex: 1 }} elevation={3}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap:1, mb:1}}> 
                <Typography variant="h6">Moderation Rules</Typography>
                <GppBadOutlinedIcon sx={{ fontSize: 25, color: 'pill.danger' }}/>
              </Box>
              <Typography variant="h4">60</Typography>
            </Paper>
            <Paper sx={{ p: 3, flex: 1 }} elevation={3}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap:1, mb:1}}>
                <Typography variant="h6">Active Sources</Typography>
                <DoneAllOutlinedIcon sx={{ fontSize: 25, color: 'pill.danger' }}/>  
              </Box>
              <Typography variant="h4">45</Typography>
            </Paper>
          </Stack>
        </Box>
        <TabContext value="1">
          <Box sx={{ borderBottom: 1, borderColor: 'divider', backgroundColor: 'background.paper', borderRadius: 1 }}>
            <TabList aria-label="dashboard tabs">
              <Tab label="Clusters" value="1" />
              <Tab label="Moderation" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1" sx={{ p: 0, pt:2 }}>
            <FilterBar />
            <CardGrid />
          </TabPanel>
          <TabPanel value="2" sx={{ p: 0, pt:2 }}>
            {/* Content for Moderation tab */}
          </TabPanel>
        </TabContext>
      </Box>
    </Box>
  );
};

export default Dashboard;

