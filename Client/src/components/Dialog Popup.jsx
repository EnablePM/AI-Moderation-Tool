import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';

const DialogPopup = ({ open, onClose, title, closeCard, clusterId, riskPercentage, sentiment, category, sources, summary}) => {

  // This is the thing that pops up when the View cluster details button is clicked. Kinda ugly. Tom lets plan a structure.
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>  
        <DialogTitle id="dialog-title" variant='h5'>{title}</DialogTitle>
        <Divider />
        <DialogContent>
            <Typography variant="body1" paragraph>
                <Typography variant='span'>Summary: </Typography>{summary}
            </Typography>
             <Box sx={{ mt: 2 }}>
              <Stack direction="column" spacing={1} sx={{ mb: 2, mt: 1 }}>
                <Box
                  sx={{
                    border: '1px solid #e0e0e0',
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'row',
                    padding: '10px 10px',
                    width: '100%',
                    borderRadius: '5px',
                    justifyContent: 'start'
                    }}
                >
                    <Typography variant="caption" sx={{fontWeight: 700}}>
                        Some contriversial post title from the news source here
                    </Typography>
                    <Divider orientation="vertical" flexItem sx={{ mx: 2 , ml: 'auto'}}/>
                    <Typography variant="caption" sx={{ml:'auto'}}>Source: X (Social Media)
                    </Typography>
                    <Divider orientation="vertical" flexItem sx={{ mx: 2 }}/>
                    <Link href="https://www.example.com" target="_blank" rel="noopener" variant='caption'>
                      View Post
                    </Link>
                </Box>
                <Box
                  sx={{
                    border: '1px solid #e0e0e0',
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'row',
                    padding: '10px 10px',
                    width: '100%',
                    borderRadius: '5px',
                    }}
                >
                  <Typography variant="body2">
                    <Typography variant="caption">Source: CNN</Typography>
                    </Typography>
                    <Divider orientation="vertical" flexItem sx={{ mx: 2 }}/>
                    <Link href="https://www.example.com" target="_blank" rel="noopener" variant='caption' sx={{ ml: 'auto' }}>
                      View Article
                    </Link>   
                </Box>
                <Box
                  sx={{
                    border: '1px solid #e0e0e0',
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'row',
                    padding: '10px 10px',
                    width: '100%',
                    borderRadius: '5px',
                    }}
                >
                  <Typography variant="body2">
                    <Typography variant="caption">Source: FOX News</Typography>
                    </Typography>   
                    <Divider orientation="vertical" flexItem sx={{ mx: 2 }}/>
                    <Link href="https://www.example.com" target="_blank" rel="noopener" variant='caption' sx={{ ml: 'auto' }}>
                      View Article
                    </Link>
                </Box>
                </Stack>
            </Box>
            <Typography variant="body2">
            Cluster ID: {clusterId} <br />
            Risk: {riskPercentage}% <br />
            Sentiment: {sentiment} <br />
            Category: {category} <br />
            Sources: {sources}
          </Typography>
        </DialogContent>
        <DialogActions>
             <Button onClick={closeCard} color="primary">
            Close
          </Button>
        </DialogActions>
    </Dialog>
    );
};

export default DialogPopup;