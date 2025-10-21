import React from 'react';
import { Box, Grid } from '@mui/material';
import MediaCard from './Card';
import cardData from '../data/dummyCardData.json';

export default function CardGrid() {
  return (
    <Box sx={{ 
      display: 'grid', 
      gridTemplateColumns: { 
        xs: '1fr', 
        md: 'repeat(2, 1fr)', 
        lg: 'repeat(3, 1fr)' 
      },
      gap: 3,
      mt:2
    }}>
      {cardData.map((data) => (
        <MediaCard key={data.id} data={data} />
      ))}
    </Box>
  );
}

