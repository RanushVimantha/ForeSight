import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import TrendingUpIcon   from '@mui/icons-material/TrendingUp';
import WarningIcon      from '@mui/icons-material/Warning';
import SecurityIcon     from '@mui/icons-material/Security';
import CheckCircleIcon  from '@mui/icons-material/CheckCircle';

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
      value: data.incidentsSolved,      // ← use this field
      icon: <CheckCircleIcon color="info" />
    },
  ];

  return (
    <Grid container spacing={2}>
      {stats.map((stat, idx) => (
        <Grid item xs={12} md={3} key={idx}>
          <Paper
            sx={{
              p: 3,
              borderRadius: 2,
              backgroundColor: (theme) => theme.palette.background.paper,
              color:            (theme) => theme.palette.text.primary,
              boxShadow:        '0 4px 8px rgba(0,0,0,0.05)'
            }}
          >
            <Typography variant="h5" gutterBottom>
              {stat.value}
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
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
