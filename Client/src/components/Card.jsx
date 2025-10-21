import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { Box, LinearProgress } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CrisisAlertSharpIcon from '@mui/icons-material/CrisisAlertSharp';

export default function MediaCard({ data }) {
  return (
    <Card sx={{ 
      padding: 3,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }}>
      <Box>
        <CardContent sx={{p: 0}}>
          <Typography gutterBottom variant="h5" component="h5">
            {data.title}
          </Typography>
          <Box>
            <Stack direction="row" spacing={1} sx={{mb:2, mt:1}}>
            <Box sx={{ bgcolor: data.riskPercentage > 75 ? 'pill.danger' : 'pill.warning', borderRadius:'50px', padding:'2px 10px', display:'flex', alignItems:'center'}}>
              <Typography variant="body2" sx={{ color: 'text.pill' }}>
              <Typography variant='caption'>Risk: {data.riskPercentage}%</Typography> 
            </Typography>
            </Box>
              <Box sx={{ bgcolor:'#fcfcfcff', borderRadius:'50px', padding:'2px 10px', border: '1px solid #e0e0e0', display:'flex', alignItems:'center'}}>
              <Typography variant="body2" sx={{ color: 'text.primary' }}>
              <Typography variant='caption'>{data.sentiment}</Typography> 
            </Typography>
            </Box>
              <Box sx={{ bgcolor:'#e0e0e0ff', borderRadius:'50px', padding:'2px 10px', display:'flex', alignItems:'center'}}>
              <Typography variant="body2" sx={{ color: 'text.primary' }}>
              <Typography variant='caption'>{data.category}</Typography> 
            </Typography>
            </Box>
            </Stack>
          </Box>
          <Box sx={{display: 'flex', gap:2, mb:2, justifyContent:'space-between', alignItems:'center'}}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              <Typography variant='span'>Cluster ID:</Typography>  {data.clusterId}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              <Typography variant='span'>Date:</Typography>  {data.date}
            </Typography>
          </Box>
          <Box/>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            <Typography variant='span'>Sources:</Typography>  {data.sources}
          </Typography>
        </CardContent>
        <LinearProgress variant="determinate" value={data.progressValue} sx={{mt: 1, marginBottom:1}} color="primary"/>
        <Typography variant="caption" sx={{ color: 'text.secondary', marginBottom:2 }}> {data.progressText}</Typography>
        <Typography/>
      </Box>
      <CardActions sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 0, mt:3}}>
        <Button size="md" sx={{width:"50%", display:"inline-flex", justifyContent:'center'}} variant="contained" color="primary" startIcon={<CrisisAlertSharpIcon/>}>View Cluster details</Button>
        <Button size="md" sx={{width:"50%"}} variant="contained" color="secondary">Suggested Phrases</Button>
      </CardActions>
    </Card>
  );
}