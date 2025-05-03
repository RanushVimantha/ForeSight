import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import WarningIcon from '@mui/icons-material/Warning';
import SecurityIcon from '@mui/icons-material/Security';

const SummaryCards = ({ data }) => {
    const stats = [
        { label: 'Total Projects', value: data.projects, icon: <TrendingUpIcon color="primary" /> },
        { label: 'Active Risks', value: data.risks, icon: <WarningIcon color="error" /> },
        { label: 'Mitigations Suggested', value: data.mitigations, icon: <SecurityIcon color="success" /> },
    ];

    return (
        <Grid container spacing={2}>
            {stats.map((stat, index) => (
                <Grid item xs={12} md={4} key={index}>
                    <Paper
                        sx={(theme) => ({
                            p: 3,
                            borderRadius: 3,
                            backgroundColor: theme.palette.background.paper,
                            color: theme.palette.text.primary,
                            boxShadow: '0 4px 8px rgba(0,0,0,0.05)'
                        })}
                    >
                        <Typography variant="h5" gutterBottom>{stat.value}</Typography>
                        <Typography variant="subtitle1">
                            {stat.icon} {stat.label}
                        </Typography>
                    </Paper>
                </Grid>
            ))}
        </Grid>
    );
};

export default SummaryCards;
