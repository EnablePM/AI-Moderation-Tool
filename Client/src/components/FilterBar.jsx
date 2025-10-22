import React from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';


export default function FilterBar() {
    //I dont need to explain this one. Its just a filter and search bar for the clusters.
  return (
    <div>
        <Paper sx={{ p: 4, borderRadius: 2, height: '100%' }} elevation={3}>
            <Typography variant="h4" gutterBottom>
                Filter & Search
            </Typography>
            <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', justifyContent:'space-between' }} >
                <TextField
                    label="Search"
                    variant="outlined"
                    size="small"
                    sx={{ width:'50ch' }}
                />
                <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                    <Button variant="outlined" color="primary">
                        All Risks
                    </Button>
                    <Button variant="outlined" color="primary">
                        High Risk
                    </Button>
                    <Button variant="outlined" color="primary">
                        Medium Risk
                    </Button>
                    <Button variant="outlined" color="primary">
                        Low Risk
                    </Button>
                </Stack>
            </Box>
        </Paper>
    </div>
  );
}   
