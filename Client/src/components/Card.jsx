import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { Box, LinearProgress, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CrisisAlertSharpIcon from '@mui/icons-material/CrisisAlertSharp';
import DialogPopup from './Dialog Popup';

export default function MediaCard({ data }) {

  //Card component for the clusters. We just need to feed live data to the card. Can do when we get API sorted.
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Card
        sx={{
          padding: 3,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Box>
          <CardContent sx={{ p: 0 }}>
            <Typography gutterBottom variant="h5" component="h5">
              {data.title}
            </Typography>
            <Box>
              <Stack direction="row" spacing={1} sx={{ mb: 2, mt: 1 }}>
                <Box
                  sx={{
                    bgcolor: data.riskPercentage > 75 ? 'pill.danger' : 'pill.warning',
                    borderRadius: '50px',
                    padding: '2px 10px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Typography variant="body2" sx={{ color: 'text.pill' }}>
                    <Typography variant="caption">Risk: {data.riskPercentage}%</Typography>
                  </Typography>
                </Box>
                <Box
                  sx={{
                    bgcolor: '#fcfcfcff',
                    borderRadius: '50px',
                    padding: '2px 10px',
                    border: '1px solid #e0e0e0',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Typography variant="body2" sx={{ color: 'text.primary' }}>
                    <Typography variant="caption">{data.sentiment}</Typography>
                  </Typography>
                </Box>
                <Box
                  sx={{
                    bgcolor: '#e0e0e0ff',
                    borderRadius: '50px',
                    padding: '2px 10px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Typography variant="body2" sx={{ color: 'text.primary' }}>
                    <Typography variant="caption">{data.category}</Typography>
                  </Typography>
                </Box>
              </Stack>
            </Box>
            <Box
              sx={{
                display: 'flex',
                gap: 2,
                mb: 2,
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                <Typography variant="span">Cluster ID:</Typography> {data.clusterId}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                <Typography variant="span">Date:</Typography> {data.date}
              </Typography>
            </Box>
            <Box />
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              <Typography variant="span">Sources:</Typography> {data.sources}
            </Typography>
          </CardContent>
          <LinearProgress
            variant="determinate"
            value={data.progressValue}
            sx={{ mt: 1, marginBottom: 1 }}
            color="primary"
          />
          <Typography variant="caption" sx={{ color: 'text.secondary', marginBottom: 2 }}>
            {data.progressText}
          </Typography>
          <Typography />
        </Box>
        <CardActions
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: 0,
            mt: 3,
          }}
        >
          <Button
            size="small"
            sx={{ width: '50%', display: 'inline-flex', justifyContent: 'center' }}
            variant="contained"
            color="primary"
            startIcon={<CrisisAlertSharpIcon />}
            onClick={handleClickOpen}
          >
            Cluster details
          </Button>
          <Button size="md" sx={{ width: '50%' }} variant="contained" color="secondary">
            Suggested Phrases
          </Button>
        </CardActions>
      </Card>

      {/* Dialog / Popup */}
      <DialogPopup
        summary="This is a summary of the cluster. It provides an overview of the main points and insights derived from the data associated with this cluster such as sources, sentiment, and risk assessment. Summaries and clustering is performed using advanced AI algorithms to help users quickly understand the context and significance of the information presented."
        open={open}
        onClose={handleClose}
        title={data.title}
        closeCard={handleClose}
        clusterId={data.clusterId}
        riskPercentage={data.riskPercentage}
        sentiment={data.sentiment}
        category={data.category}
        sources={data.sources}
      />
    </>
  );
}
