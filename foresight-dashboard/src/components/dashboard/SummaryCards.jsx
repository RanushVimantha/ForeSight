import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import WarningIcon from '@mui/icons-material/Warning';
import SecurityIcon from '@mui/icons-material/Security';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const SummaryCards = ({ data }) => {
  const stats = [
    {
      label: 'Total Projects',
      value: data.projects,
      icon: <TrendingUpIcon color="primary" />
    },
    {
      label: 'Active Risks',
      value: data.risks,
      icon: <WarningIcon color="error" />
    },
    {
      label: 'Mitigations Suggested',
      value: data.mitigations,
      icon: <SecurityIcon color="success" />
    },
    {
      label: 'Incidents Solved',
      value: data.incidentsSolved,
      icon: <CheckCircleIcon color="info" />
    },
  ];

  return (
    <Grid container spacing={2}>
      {stats.map((stat, idx) => (
        <Grid item xs={12} sm={6} md={3} key={idx}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              borderRadius: 3,
              backgroundColor: '#fff',
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              height: '100%',
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              {stat.value}
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              {stat.icon}
              {stat.label}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default SummaryCards;
